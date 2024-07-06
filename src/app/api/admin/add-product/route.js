export const dynamic = "force-dynamic";
import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Product from "@/models/product";
import joi from "joi";

const AddNewProductSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required(),
  imageUrl: joi.string().required(),
  category: joi.string().required(),
  packaging: joi.array().required(),
  deliveryInfo: joi.string().required(),
  onSale: joi.string().required(),
  priceDrop: joi.number().required(),
});

export async function POST(req) {
  try {
    await connectToDB();

    const user = "admin";
    if (user === "admin") {
      const extractData = await req.json();
      const {
        name,
        description,
        price,
        imageUrl,
        category,
        packaging,
        deliveryInfo,
        onSale,
        priceDrop,
      } = extractData;

      const { error } = AddNewProductSchema.validate({
        name,
        description,
        price,
        imageUrl,
        category,
        packaging,
        deliveryInfo,
        onSale,
        priceDrop,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlyCreatedProduct = await Product.create(extractData);

      if (newlyCreatedProduct) {
        return NextResponse.json({
          success: true,
          message: "Product added successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to add the product! Please try again later.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized to add new products.",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later.",
    });
  }
}
