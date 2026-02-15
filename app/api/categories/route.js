import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";
import { categorySchema, validatePayload } from "@/lib/validation";
import Category from "@/models/Category";

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
  const categories = await Category.find({ userId }).sort({ name: 1 });
  return NextResponse.json({ success: true, data: categories });
}

export async function POST(request) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { error, value } = validatePayload(categorySchema, body);
  if (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }

  await connectDB();
  try {
    const category = await Category.create({
      userId,
      name: value.name,
      description: value.description || ""
    });
    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (err) {
    if (err?.code === 11000) {
      return NextResponse.json({ success: false, error: "Category already exists" }, { status: 409 });
    }
    return NextResponse.json({ success: false, error: "Failed to create category" }, { status: 500 });
  }
}
