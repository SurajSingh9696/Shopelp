import mongoose, { Schema } from "mongoose";

const PurchaseSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // Legacy single-item fields (kept for backward compatibility)
    itemId: { type: Schema.Types.ObjectId, ref: "Item" },
    quantity: { type: Number },
    perItemCost: { type: Number },
    smallPacketsPerBox: { type: Number },
    sellingPricePerSmallPacket: { type: Number, default: 0 },
    sellingPricePerBox: { type: Number, default: 0 },
    profitPerBox: { type: Number, default: 0 },
    profitMarginPercent: { type: Number, default: 0 },

    // Multi-item purchase fields
    totalCost: { type: Number, required: true },
    totalBoxes: { type: Number, default: 0 },
    totalProfit: { type: Number, default: 0 },
    lineItems: [
      {
        itemId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
        quantity: { type: Number, required: true },
        totalCost: { type: Number, required: true },
        perItemCost: { type: Number, required: true },
        smallPacketsPerBox: { type: Number, required: true },
        sellingPricePerSmallPacket: { type: Number, default: 0 },
        sellingPricePerBox: { type: Number, default: 0 },
        profitPerBox: { type: Number, default: 0 },
        profitMarginPercent: { type: Number, default: 0 }
      }
    ],
    date: { type: Date, default: Date.now },
    notes: { type: String }
  },
  { timestamps: true }
);

export default mongoose.models.Purchase || mongoose.model("Purchase", PurchaseSchema);
