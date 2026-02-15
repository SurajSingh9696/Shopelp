import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";
import mongoose from "mongoose";
import Purchase from "@/models/Purchase";
import Item from "@/models/Item";

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
  const period = searchParams.get("period") || "6months"; // week, month, year, 6months
  const itemId = searchParams.get("itemId");

  await connectDB();

  const userObjectId = new mongoose.Types.ObjectId(userId);

  const now = new Date();
  let startDate = new Date();
  let seriesCount = 6;

  switch (period) {
    case "week":
      startDate.setDate(now.getDate() - 7);
      seriesCount = 7;
      break;
    case "month":
      startDate.setMonth(now.getMonth() - 1);
      seriesCount = 30;
      break;
    case "year":
      startDate.setFullYear(now.getFullYear() - 1);
      seriesCount = 12;
      break;
    case "6months":
    default:
      startDate.setMonth(now.getMonth() - 6);
      seriesCount = 6;
  }

  const purchaseQuery = { userId: userObjectId, date: { $gte: startDate } };
  if (itemId) {
    purchaseQuery.$or = [
      { itemId: new mongoose.Types.ObjectId(itemId) },
      { "lineItems.itemId": new mongoose.Types.ObjectId(itemId) }
    ];
  }

  const [items, purchases] = await Promise.all([
    Item.find(itemId ? { userId, _id: itemId } : { userId }).lean(),
    Purchase.find(purchaseQuery).sort({ date: -1, createdAt: -1 }).lean()
  ]);

  const monthLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const buildSeries = (count, type = "month") => {
    const series = [];
    if (type === "month") {
      for (let i = count - 1; i >= 0; i -= 1) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        series.push({ key, label: monthLabels[date.getMonth()], value: 0, profit: 0, count: 0 });
      }
    } else {
      for (let i = count - 1; i >= 0; i -= 1) {
        const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        const indexLabel = count - i;
        const label = period === "week" ? dayLabels[date.getDay()] : String(indexLabel);
        series.push({ key, label, value: 0, profit: 0, count: 0 });
      }
    }
    return series;
  };

  const purchaseSeries = period === "week" || period === "month"
    ? buildSeries(seriesCount, "day")
    : buildSeries(seriesCount, "month");
  const purchaseMap = new Map(purchaseSeries.map((entry) => [entry.key, entry]));

  const getPurchaseTotals = (purchase) => {
    if (Array.isArray(purchase.lineItems) && purchase.lineItems.length > 0) {
      const totalCost = purchase.lineItems.reduce((sum, line) => sum + (line.totalCost || 0), 0);
      const totalProfit = purchase.lineItems.reduce(
        (sum, line) => sum + (line.profitPerBox || 0) * (line.quantity || 0),
        0
      );
      const totalBoxes = purchase.lineItems.reduce((sum, line) => sum + (line.quantity || 0), 0);
      const marginAvg = purchase.lineItems.length
        ? purchase.lineItems.reduce((sum, line) => sum + (parseFloat(line.profitMarginPercent) || 0), 0) / purchase.lineItems.length
        : 0;
      return { totalCost, totalProfit, totalBoxes, marginAvg };
    }

    const totalCost = purchase.totalCost || 0;
    const totalProfit = (purchase.profitPerBox || 0) * (purchase.quantity || 0);
    const totalBoxes = purchase.quantity || 0;
    const marginAvg = parseFloat(purchase.profitMarginPercent) || 0;
    return { totalCost, totalProfit, totalBoxes, marginAvg };
  };

  purchases.forEach((purchase) => {
    const date = new Date(purchase.date || purchase.createdAt || Date.now());
    let key;
    if (period === "week" || period === "month") {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    } else {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    }
    const entry = purchaseMap.get(key);
    if (entry) {
      const totals = getPurchaseTotals(purchase);
      entry.value += totals.totalCost;
      entry.profit += totals.totalProfit;
      entry.count += totals.totalBoxes;
    }
  });

  const marginSeries = period === "week" || period === "month"
    ? buildSeries(seriesCount, "day")
    : buildSeries(seriesCount, "month");
  const marginTotals = new Map(marginSeries.map((entry) => [entry.key, { sum: 0, count: 0 }]));

  purchases.forEach((purchase) => {
    const date = new Date(purchase.date || purchase.createdAt || Date.now());
    let key;
    if (period === "week" || period === "month") {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    } else {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    }
    const bucket = marginTotals.get(key);
    if (bucket) {
      const totals = getPurchaseTotals(purchase);
      bucket.sum += totals.marginAvg || 0;
      bucket.count += 1;
    }
  });

  marginSeries.forEach((entry) => {
    const bucket = marginTotals.get(entry.key);
    if (bucket && bucket.count > 0) {
      entry.value = Math.round(bucket.sum / bucket.count);
    }
  });

  const purchaseValue = purchases.reduce((sum, purchase) => sum + (purchase.totalCost || 0), 0);
  const totalProfit = purchases.reduce((sum, purchase) => sum + getPurchaseTotals(purchase).totalProfit, 0);
  let salesValue = 0;
  let netProfit = 0;
  let lowStockCount = 0;

  const latestPurchases = purchases
    .filter((purchase) => purchase.lineItems?.length || purchase.itemId)
    .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));

  const latestPurchaseMap = new Map();
  latestPurchases.forEach((purchase) => {
    if (Array.isArray(purchase.lineItems) && purchase.lineItems.length > 0) {
      purchase.lineItems.forEach((line) => {
        const key = line.itemId?.toString?.() || line.itemId;
        if (!latestPurchaseMap.has(key)) {
          latestPurchaseMap.set(key, line);
        }
      });
    } else if (purchase.itemId) {
      const key = purchase.itemId.toString();
      if (!latestPurchaseMap.has(key)) {
        latestPurchaseMap.set(key, purchase);
      }
    }
  });

  const topItems = items
    .map((item) => {
      const latestLine = latestPurchaseMap.get(item._id.toString());
      const cost = latestLine?.perItemCost || 0;
      const sellingPricePerBox = (item.sellingPricePerSmallPacket || 0) * (item.smallPacketsPerBox || 1);
      const profit = sellingPricePerBox - cost;
      const stockValue = sellingPricePerBox * (item.stock || 0);
      const margin = sellingPricePerBox ? Math.round((profit / sellingPricePerBox) * 100) : 0;

      salesValue += stockValue;
      netProfit += profit * (item.stock || 0);
      if ((item.stock || 0) <= 5) {
        lowStockCount += 1;
      }

      return {
        itemId: item._id.toString(),
        name: item.name,
        margin,
        stock: item.stock,
        stockValue
      };
    })
    .sort((a, b) => b.margin - a.margin)
    .slice(0, 6);

  const monthTicks = [1, 5, 9, 12, 16, 20, 23, 27, 30];
  const ticks = {
    purchases: purchaseSeries
      .filter((entry) => {
        if (period === "month") {
          const day = Number(entry.label);
          return monthTicks.includes(day);
        }
        return true;
      })
      .map((entry) => entry.key),
    margins: marginSeries
      .filter((entry) => {
        if (period === "month") {
          const day = Number(entry.label);
          return monthTicks.includes(day);
        }
        return true;
      })
      .map((entry) => entry.key)
  };

  return NextResponse.json({
    success: true,
    data: {
      totals: {
        itemCount: items.length,
        purchaseValue,
        salesValue: Math.round(salesValue),
        netProfit: Math.round(netProfit),
        totalProfit: Math.round(totalProfit),
        lowStockCount
      },
      trends: {
        purchases: purchaseSeries.map(({ key, label, value, profit, count }) => ({ key, label, value, profit, count })),
        margins: marginSeries.map(({ key, label, value }) => ({ key, label, value }))
      },
      ticks,
      period,
      topItems
    }
  });
}
