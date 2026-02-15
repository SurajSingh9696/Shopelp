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

export async function PUT(request, { params }) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { error, value } = validatePayload(categorySchema, body);
  if (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }

  const { id } = await params;
  await connectDB();
  try {
    const category = await Category.findOneAndUpdate(
      { _id: id, userId },
      { name: value.name, description: value.description || "" },
      { new: true }
    );

    if (!category) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: category });
  } catch (err) {
    if (err?.code === 11000) {
      return NextResponse.json({ success: false, error: "Category already exists" }, { status: 409 });
    }
    return NextResponse.json({ success: false, error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await connectDB();
  const category = await Category.findOneAndDelete({ _id: id, userId });
  if (!category) {
    return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "Category deleted" });
}
