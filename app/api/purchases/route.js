import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";
import { purchaseSchema, validatePayload } from "@/lib/validation";
import Purchase from "@/models/Purchase";
import Item from "@/models/Item";
import mongoose from "mongoose";

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
  const itemId = searchParams.get("itemId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  await connectDB();
  
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

  const purchases = await Purchase.find(query).sort({ date: -1, createdAt: -1 });
  return NextResponse.json({ success: true, data: purchases });
}

export async function POST(request) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { error, value } = validatePayload(purchaseSchema, body);
  if (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }

  await connectDB();
  
  const hasLineItems = Array.isArray(value.lineItems) && value.lineItems.length > 0;

  if (hasLineItems) {
    const itemIds = value.lineItems.map((line) => line.itemId);
    const items = await Item.find({ _id: { $in: itemIds } }).lean();
    const itemMap = new Map(items.map((item) => [item._id.toString(), item]));

    const missingItem = value.lineItems.find((line) => !itemMap.get(line.itemId));
    if (missingItem) {
      return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
    }

    const lineItems = value.lineItems.map((line) => {
      const item = itemMap.get(line.itemId);
      const perItemCost = line.totalCost / line.quantity;
      const sellingPricePerBox = item.sellingPricePerSmallPacket * item.smallPacketsPerBox;
      const profitPerBox = sellingPricePerBox - perItemCost;
      const profitMarginPercent = sellingPricePerBox > 0
        ? ((profitPerBox / sellingPricePerBox) * 100).toFixed(2)
        : 0;

      return {
        itemId: new mongoose.Types.ObjectId(line.itemId),
        quantity: line.quantity,
        totalCost: line.totalCost,
        perItemCost,
        smallPacketsPerBox: item.smallPacketsPerBox,
        sellingPricePerSmallPacket: item.sellingPricePerSmallPacket,
        sellingPricePerBox,
        profitPerBox,
        profitMarginPercent
      };
    });

    const totalCost = lineItems.reduce((sum, line) => sum + (line.totalCost || 0), 0);
    const totalBoxes = lineItems.reduce((sum, line) => sum + (line.quantity || 0), 0);
    const totalProfit = lineItems.reduce(
      (sum, line) => sum + (line.profitPerBox || 0) * (line.quantity || 0),
      0
    );

    const purchase = await Purchase.create({
      userId: new mongoose.Types.ObjectId(userId),
      totalCost,
      totalBoxes,
      totalProfit,
      lineItems,
      date: value.date || new Date(),
      notes: value.notes
    });

    const bulkOps = lineItems.map((line) => ({
      updateOne: {
        filter: { _id: line.itemId },
        update: { $inc: { stock: line.quantity } }
      }
    }));
    if (bulkOps.length > 0) {
      await Item.bulkWrite(bulkOps);
    }

    return NextResponse.json({ success: true, data: purchase }, { status: 201 });
  }

  // Legacy single-item purchase
  const item = await Item.findById(value.itemId);
  if (!item) {
    return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
  }

  const perItemCost = value.totalCost / value.quantity;
  const sellingPricePerBox = item.sellingPricePerSmallPacket * item.smallPacketsPerBox;
  const profitPerBox = sellingPricePerBox - perItemCost;
  const profitMarginPercent = sellingPricePerBox > 0
    ? ((profitPerBox / sellingPricePerBox) * 100).toFixed(2)
    : 0;

  const purchase = await Purchase.create({
    userId: new mongoose.Types.ObjectId(userId),
    itemId: new mongoose.Types.ObjectId(value.itemId),
    quantity: value.quantity,
    totalCost: value.totalCost,
    perItemCost,
    smallPacketsPerBox: item.smallPacketsPerBox,
    sellingPricePerSmallPacket: item.sellingPricePerSmallPacket,
    sellingPricePerBox,
    profitPerBox,
    profitMarginPercent,
    totalBoxes: value.quantity,
    totalProfit: profitPerBox * value.quantity,
    lineItems: [
      {
        itemId: new mongoose.Types.ObjectId(value.itemId),
        quantity: value.quantity,
        totalCost: value.totalCost,
        perItemCost,
        smallPacketsPerBox: item.smallPacketsPerBox,
        sellingPricePerSmallPacket: item.sellingPricePerSmallPacket,
        sellingPricePerBox,
        profitPerBox,
        profitMarginPercent
      }
    ],
    date: value.date || new Date(),
    notes: value.notes
  });

  await Item.findByIdAndUpdate(value.itemId, { $inc: { stock: value.quantity } });

  return NextResponse.json({ success: true, data: purchase }, { status: 201 });
}
