import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";
import { generateSku } from "@/lib/sku";
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
      created: [],
      updated: [],
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

        const itemDataTrimmed = {
          name: itemData.name.trim(),
          category: itemData.category.trim(),
          description: itemData.description?.trim() || "",
          stock: Number(itemData.stock) || 0,
          smallPacketsPerBox: Number(itemData.smallPacketsPerBox) || 1,
          sellingPricePerSmallPacket: Number(itemData.sellingPricePerSmallPacket) || 0,
          unit: itemData.unit?.trim() || "box",
          imageUrl: itemData.imageUrl?.trim() || ""
        };

        // Check if SKU is provided in CSV
        if (itemData.sku && itemData.sku.trim() !== "") {
          const sku = itemData.sku.trim();
          
          // Try to find existing item by SKU
          const existing = await Item.findOne({ userId, sku });
          
          if (existing) {
            // Update existing item
            existing.name = itemDataTrimmed.name;
            existing.category = itemDataTrimmed.category;
            existing.description = itemDataTrimmed.description;
            existing.stock = itemDataTrimmed.stock;
            existing.smallPacketsPerBox = itemDataTrimmed.smallPacketsPerBox;
            existing.sellingPricePerSmallPacket = itemDataTrimmed.sellingPricePerSmallPacket;
            existing.unit = itemDataTrimmed.unit;
            if (itemDataTrimmed.imageUrl) {
              existing.imageUrl = itemDataTrimmed.imageUrl;
            }
            
            await existing.save();
            results.updated.push(existing.name);
          } else {
            // Create new item with provided SKU
            const item = await Item.create({
              userId,
              ...itemDataTrimmed,
              sku
            });
            results.created.push(item.name);
          }
        } else {
          // Generate SKU for new item
          const sku = generateSku(itemDataTrimmed.category, itemDataTrimmed.name);

          // Check if auto-generated SKU already exists
          const existing = await Item.findOne({ userId, sku });
          if (existing) {
            results.failed.push({
              name: itemDataTrimmed.name,
              error: "Item with similar name already exists"
            });
            continue;
          }

          // Create new item
          const item = await Item.create({
            userId,
            ...itemDataTrimmed,
            sku
          });
          results.created.push(item.name);
        }
      } catch (err) {
        results.failed.push({
          name: itemData.name || "Unknown",
          error: err.message || "Failed to process item"
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        created: results.created.length,
        updated: results.updated.length,
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
