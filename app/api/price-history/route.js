import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";
import { sellingPriceUpdateSchema, validatePayload } from "@/lib/validation";
import Item from "@/models/Item";
import SellingPriceHistory from "@/models/SellingPriceHistory";

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

  await connectDB();
  
  const query = { userId };
  if (itemId) query.itemId = itemId;

  const history = await SellingPriceHistory.find(query).sort({ effectiveDate: -1, createdAt: -1 });
  return NextResponse.json({ success: true, data: history });
}

export async function POST(request) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { error, value } = validatePayload(sellingPriceUpdateSchema, body);
  if (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }

  await connectDB();

  // Get item and update selling price
  const item = await Item.findOne({ _id: value.itemId, userId });
  if (!item) {
    return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
  }

  const oldPrice = item.sellingPricePerSmallPacket;
  item.sellingPricePerSmallPacket = value.sellingPricePerSmallPacket;
  await item.save();

  // Create history entry
  const history = await SellingPriceHistory.create({
    userId,
    itemId: value.itemId,
    sellingPricePerSmallPacket: value.sellingPricePerSmallPacket,
    effectiveDate: new Date(),
    notes: value.notes || `Price updated from ${oldPrice} to ${value.sellingPricePerSmallPacket}`
  });

  return NextResponse.json({ success: true, data: history }, { status: 201 });
}
