import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";
import { generateSKU } from "@/lib/sku";
import Item from "@/models/Item";

function getUserId(request) {
  const token = request.cookies.get("accessToken")?.value;
  const decoded = token ? verifyAccessToken(token) : null;
  return decoded?.sub || null;
}

export async function POST(request) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { items } = await request.json();
    
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: "No items provided" }, { status: 400 });
    }

    await connectDB();

    const results = {
      success: [],
      failed: []
    };

    for (const itemData of items) {
      try {
        // Validate required fields
        if (!itemData.name || !itemData.category) {
          results.failed.push({
            name: itemData.name || "Unknown",
            error: "Missing required fields (name, category)"
          });
          continue;
        }

        // Generate SKU
        const sku = generateSKU(itemData.name, itemData.category);

        // Check if SKU already exists
        const existing = await Item.findOne({ userId, sku });
        if (existing) {
          results.failed.push({
            name: itemData.name,
            error: "Item with similar name already exists"
          });
          continue;
        }

        // Create item
        const item = await Item.create({
          userId,
          name: itemData.name.trim(),
          category: itemData.category.trim(),
          description: itemData.description?.trim() || "",
          sku,
          stock: Number(itemData.stock) || 0,
          smallPacketsPerBox: Number(itemData.smallPacketsPerBox) || 1,
          sellingPricePerSmallPacket: Number(itemData.sellingPricePerSmallPacket) || 0,
          unit: itemData.unit?.trim() || "box",
          imageUrl: itemData.imageUrl?.trim() || ""
        });

        results.success.push(item.name);
      } catch (err) {
        results.failed.push({
          name: itemData.name || "Unknown",
          error: err.message || "Failed to create item"
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        imported: results.success.length,
        failed: results.failed.length,
        details: results
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to import items" },
      { status: 500 }
    );
  }
}
