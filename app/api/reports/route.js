import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";
import Item from "@/models/Item";
import Purchase from "@/models/Purchase";

function getUserId(request) {
  const token = request.cookies.get("accessToken")?.value;
  const decoded = token ? verifyAccessToken(token) : null;
  return decoded?.sub || null;
}

export async function GET(request) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const reportType = searchParams.get("type") || "profit"; // profit, inventory, purchases
  const itemId = searchParams.get("itemId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  await connectDB();

  if (reportType === "purchases") {
    const query = { userId };
    if (itemId) {
      query.$or = [
        { itemId },
        { "lineItems.itemId": itemId }
      ];
    }
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const purchases = await Purchase.find(query)
      .sort({ date: -1 })
      .populate("itemId", "name category sku")
      .populate("lineItems.itemId", "name category sku");

    const rows = purchases.flatMap((purchase) => {
      if (Array.isArray(purchase.lineItems) && purchase.lineItems.length > 0) {
        return purchase.lineItems.map((line) => ({
          itemName: line.itemId?.name || "N/A",
          category: line.itemId?.category || "N/A",
          sku: line.itemId?.sku || "N/A",
          date: new Date(purchase.date).toLocaleDateString(),
          quantity: line.quantity,
          totalCost: line.totalCost,
          perBoxCost: line.perItemCost,
          sellingPricePerBox: line.sellingPricePerBox,
          profitPerBox: line.profitPerBox,
          profitMargin: line.profitMarginPercent,
          totalProfit: (line.profitPerBox || 0) * (line.quantity || 0)
        }));
      }

      return [
        {
          itemName: purchase.itemId?.name || "N/A",
          category: purchase.itemId?.category || "N/A",
          sku: purchase.itemId?.sku || "N/A",
          date: new Date(purchase.date).toLocaleDateString(),
          quantity: purchase.quantity,
          totalCost: purchase.totalCost,
          perBoxCost: purchase.perItemCost,
          sellingPricePerBox: purchase.sellingPricePerBox,
          profitPerBox: purchase.profitPerBox,
          profitMargin: purchase.profitMarginPercent,
          totalProfit: (purchase.profitPerBox || 0) * (purchase.quantity || 0)
        }
      ];
    });

    return NextResponse.json({ success: true, data: rows, reportType: "purchases" });
  }

  if (reportType === "inventory") {
    const query = { userId };
    if (itemId) query._id = itemId;

    const items = await Item.find(query).sort({ name: 1 });
    
    const rows = items.map((item) => ({
      name: item.name,
      category: item.category,
      sku: item.sku,
      stock: item.stock,
      smallPacketsPerBox: item.smallPacketsPerBox,
      sellingPricePerSmallPacket: item.sellingPricePerSmallPacket,
      sellingPricePerBox: (item.sellingPricePerSmallPacket || 0) * (item.smallPacketsPerBox || 1),
      stockValue: (item.sellingPricePerSmallPacket || 0) * (item.smallPacketsPerBox || 1) * (item.stock || 0)
    }));

    return NextResponse.json({ success: true, data: rows, reportType: "inventory" });
  }

  // Default: profit report
  const items = await Item.find(itemId ? { userId, _id: itemId } : { userId });
  const purchaseQuery = { userId };
  if (itemId) {
    purchaseQuery.$or = [
      { itemId },
      { "lineItems.itemId": itemId }
    ];
  }
  if (startDate || endDate) {
    purchaseQuery.date = {};
    if (startDate) purchaseQuery.date.$gte = new Date(startDate);
    if (endDate) purchaseQuery.date.$lte = new Date(endDate);
  }

  const latestPurchases = await Purchase.find(purchaseQuery).sort({ date: -1 });

  const purchaseMap = new Map();
  latestPurchases.forEach((purchase) => {
    if (Array.isArray(purchase.lineItems) && purchase.lineItems.length > 0) {
      purchase.lineItems.forEach((line) => {
        const key = line.itemId?.toString() || line.itemId;
        if (!purchaseMap.has(key)) {
          purchaseMap.set(key, line);
        }
      });
      return;
    }
    if (purchase.itemId && !purchaseMap.has(purchase.itemId.toString())) {
      purchaseMap.set(purchase.itemId.toString(), purchase);
    }
  });

  const rows = items.map((item) => {
    const purchase = purchaseMap.get(item._id.toString());
    const cost = purchase?.perItemCost || 0;
    const sellingPricePerBox = (item.sellingPricePerSmallPacket || 0) * (item.smallPacketsPerBox || 1);
    const profit = sellingPricePerBox - cost;
    const margin = sellingPricePerBox ? Math.round((profit / sellingPricePerBox) * 100) : 0;
    
    return {
      name: item.name,
      category: item.category,
      sku: item.sku,
      smallPacketsPerBox: item.smallPacketsPerBox,
      sellingPricePerSmallPacket: item.sellingPricePerSmallPacket,
      costPerBox: cost,
      sellingPricePerBox,
      profitPerBox: profit,
      margin,
      stock: item.stock,
      totalProfit: profit * (item.stock || 0)
    };
  });

  return NextResponse.json({ success: true, data: rows, reportType: "profit" });
}
