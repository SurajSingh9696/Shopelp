import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";
import { sellingPriceSchema, validatePayload } from "@/lib/validation";
import SellingPrice from "@/models/SellingPrice";

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
  const prices = await SellingPrice.find({ userId }).sort({ updatedAt: -1 });
  return NextResponse.json({ success: true, data: prices });
}

export async function POST(request) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { error, value } = validatePayload(sellingPriceSchema, body);
  if (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }

  await connectDB();
  const price = await SellingPrice.findOneAndUpdate(
    { userId, itemId: value.itemId },
    {
      sellingPrice: value.sellingPrice,
      bulkPrice: value.bulkPrice,
      updatedAt: new Date()
    },
    { upsert: true, new: true }
  );

  return NextResponse.json({ success: true, data: price }, { status: 201 });
}
