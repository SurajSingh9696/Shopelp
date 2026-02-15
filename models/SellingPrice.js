import mongoose, { Schema } from "mongoose";

const SellingPriceSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    itemId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    sellingPrice: { type: Number, required: true },
    bulkPrice: { type: Number },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.models.SellingPrice || mongoose.model("SellingPrice", SellingPriceSchema);
