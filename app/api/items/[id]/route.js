import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";
import { itemSchema, validatePayload } from "@/lib/validation";
import Item from "@/models/Item";
import SellingPriceHistory from "@/models/SellingPriceHistory";

function getUserId(request) {
  const token = request.cookies.get("accessToken")?.value;
  const decoded = token ? verifyAccessToken(token) : null;
  return decoded?.sub || null;
}

export async function GET(request, { params }) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await connectDB();
  const item = await Item.findOne({ _id: id, userId });
  
  if (!item) {
    return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: item });
}

export async function PUT(request, { params }) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { error, value } = validatePayload(itemSchema, body);
  if (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }

  const { id } = await params;
  await connectDB();
  const item = await Item.findOne({ _id: id, userId });
  
  if (!item) {
    return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
  }

  const oldPrice = item.sellingPricePerSmallPacket;
  const newPrice = value.sellingPricePerSmallPacket || 0;

  // Update item
  Object.assign(item, {
    name: value.name,
    category: value.category,
    description: value.description,
    imageUrl: value.imageUrl,
    stock: value.stock,
    smallPacketsPerBox: value.smallPacketsPerBox,
    sellingPricePerSmallPacket: newPrice,
    unit: value.unit || item.unit
  });

  await item.save();

  // If selling price changed, create history entry
  if (oldPrice !== newPrice && newPrice > 0) {
    await SellingPriceHistory.create({
      userId,
      itemId: item._id,
      sellingPricePerSmallPacket: newPrice,
      effectiveDate: new Date(),
      notes: `Price updated from ${oldPrice} to ${newPrice}`
    });
  }

  return NextResponse.json({ success: true, data: item });
}

export async function DELETE(request, { params }) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await connectDB();
  const item = await Item.findOneAndDelete({ _id: id, userId });
  
  if (!item) {
    return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "Item deleted successfully" });
}
