import mongoose, { Schema } from "mongoose";

const SellingPriceHistorySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    itemId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    sellingPricePerSmallPacket: { type: Number, required: true },
    effectiveDate: { type: Date, default: Date.now },
    notes: { type: String }
  },
  { timestamps: true }
);

// Index for efficient queries
SellingPriceHistorySchema.index({ itemId: 1, effectiveDate: -1 });

export default mongoose.models.SellingPriceHistory || mongoose.model("SellingPriceHistory", SellingPriceHistorySchema);
