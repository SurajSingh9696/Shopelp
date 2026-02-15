import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";
import { itemSchema, validatePayload } from "@/lib/validation";
import { generateSku } from "@/lib/sku";
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

  await connectDB();
  const items = await Item.find({ userId }).sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: items });
}

export async function POST(request) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { error, value } = validatePayload(itemSchema, body);
  if (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }

  await connectDB();
  const sku = generateSku(value.category, value.name);
  const item = await Item.create({
    userId,
    name: value.name,
    category: value.category,
    description: value.description,
    imageUrl: value.imageUrl,
    sku,
    stock: value.stock,
    smallPacketsPerBox: value.smallPacketsPerBox,
    sellingPricePerSmallPacket: value.sellingPricePerSmallPacket || 0,
    unit: value.unit || "box"
  });

  return NextResponse.json({ success: true, data: item }, { status: 201 });
}
