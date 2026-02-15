import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    sku: { type: String, required: true, unique: true },
    imageUrl: { type: String },
    stock: { type: Number, default: 0 }, // Stock in big packets
    smallPacketsPerBox: { type: Number, required: true, default: 1 }, // Number of small packets in one big packet
    sellingPricePerSmallPacket: { type: Number, default: 0 }, // Current selling price per small packet
    unit: { type: String, default: "box" } // Unit of measurement
  },
  { timestamps: true }
);

export default mongoose.models.Item || mongoose.model("Item", ItemSchema);
