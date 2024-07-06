import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    imageUrl: String,
    category: String,
    packaging: Array,
    deliveryInfo: String,
    onSale: String,
    priceDrop: Number,
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Product;
