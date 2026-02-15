import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";
import { purchaseSchema, validatePayload } from "@/lib/validation";
import Purchase from "@/models/Purchase";
import Item from "@/models/Item";

function getUserId(request) {
  const token = request.cookies.get("accessToken")?.value;
  const decoded = token ? verifyAccessToken(token) : null;
  return decoded?.sub || null;
}

function normalizeLineItems(purchase) {
  if (Array.isArray(purchase.lineItems) && purchase.lineItems.length > 0) {
    return purchase.lineItems.map((line) => ({
      itemId: line.itemId?.toString() || line.itemId,
      quantity: line.quantity,
      totalCost: line.totalCost
    }));
  }
  if (purchase.itemId) {
    return [
      {
        itemId: purchase.itemId?.toString() || purchase.itemId,
        quantity: purchase.quantity,
        totalCost: purchase.totalCost
      }
    ];
  }
  return [];
}

export async function GET(request, { params }) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await connectDB();
  const purchase = await Purchase.findOne({ _id: id, userId });

  if (!purchase) {
    return NextResponse.json({ success: false, error: "Purchase not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: purchase });
}

export async function PUT(request, { params }) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { error, value } = validatePayload(purchaseSchema, body);
  if (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }

  const { id } = await params;
  await connectDB();
  const purchase = await Purchase.findOne({ _id: id, userId });

  if (!purchase) {
    return NextResponse.json({ success: false, error: "Purchase not found" }, { status: 404 });
  }

  const oldLineItems = normalizeLineItems(purchase);
  const newLineItemsInput = Array.isArray(value.lineItems) && value.lineItems.length > 0
    ? value.lineItems
    : [
        {
          itemId: value.itemId,
          quantity: value.quantity,
          totalCost: value.totalCost
        }
      ];

  const itemIds = newLineItemsInput.map((line) => line.itemId);
  const items = await Item.find({ _id: { $in: itemIds } }).lean();
  const itemMap = new Map(items.map((item) => [item._id.toString(), item]));
  const missingItem = newLineItemsInput.find((line) => !itemMap.get(line.itemId));
  if (missingItem) {
    return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
  }

  const lineItems = newLineItemsInput.map((line) => {
    const item = itemMap.get(line.itemId);
    const perItemCost = line.totalCost / line.quantity;
    const sellingPricePerBox = item.sellingPricePerSmallPacket * item.smallPacketsPerBox;
    const profitPerBox = sellingPricePerBox - perItemCost;
    const profitMarginPercent = sellingPricePerBox > 0
      ? ((profitPerBox / sellingPricePerBox) * 100).toFixed(2)
      : 0;

    return {
      itemId: line.itemId,
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

  // Update stock based on delta between old and new items
  const oldMap = new Map();
  oldLineItems.forEach((line) => {
    oldMap.set(line.itemId.toString(), (oldMap.get(line.itemId.toString()) || 0) + (line.quantity || 0));
  });
  const newMap = new Map();
  lineItems.forEach((line) => {
    newMap.set(line.itemId.toString(), (newMap.get(line.itemId.toString()) || 0) + (line.quantity || 0));
  });

  const allItemIds = new Set([...oldMap.keys(), ...newMap.keys()]);
  const bulkOps = [];
  allItemIds.forEach((id) => {
    const diff = (newMap.get(id) || 0) - (oldMap.get(id) || 0);
    if (diff !== 0) {
      bulkOps.push({
        updateOne: {
          filter: { _id: id },
          update: { $inc: { stock: diff } }
        }
      });
    }
  });
  if (bulkOps.length > 0) {
    await Item.bulkWrite(bulkOps);
  }

  const isSingleItem = lineItems.length === 1;
  const legacy = isSingleItem ? lineItems[0] : null;

  Object.assign(purchase, {
    itemId: isSingleItem ? legacy.itemId : undefined,
    quantity: isSingleItem ? legacy.quantity : undefined,
    perItemCost: isSingleItem ? legacy.perItemCost : undefined,
    smallPacketsPerBox: isSingleItem ? legacy.smallPacketsPerBox : undefined,
    sellingPricePerSmallPacket: isSingleItem ? legacy.sellingPricePerSmallPacket : undefined,
    sellingPricePerBox: isSingleItem ? legacy.sellingPricePerBox : undefined,
    profitPerBox: isSingleItem ? legacy.profitPerBox : undefined,
    profitMarginPercent: isSingleItem ? legacy.profitMarginPercent : undefined,
    totalCost,
    totalBoxes,
    totalProfit,
    lineItems,
    date: value.date || purchase.date,
    notes: value.notes
  });

  await purchase.save();

  return NextResponse.json({ success: true, data: purchase });
}

export async function DELETE(request, { params }) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await connectDB();
  const purchase = await Purchase.findOne({ _id: id, userId });

  if (!purchase) {
    return NextResponse.json({ success: false, error: "Purchase not found" }, { status: 404 });
  }

  const lineItems = normalizeLineItems(purchase);
  const bulkOps = lineItems.map((line) => ({
    updateOne: {
      filter: { _id: line.itemId },
      update: { $inc: { stock: -(line.quantity || 0) } }
    }
  }));
  if (bulkOps.length > 0) {
    await Item.bulkWrite(bulkOps);
  }

  await purchase.deleteOne();

  return NextResponse.json({ success: true, message: "Purchase deleted successfully" });
}
