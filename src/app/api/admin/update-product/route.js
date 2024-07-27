import { NextResponse } from "next/server";
import connectToDB from "@/database";
import Product from "@/models/product";
import { authorizationService } from "@/utils/authVerify";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();

    // Extract the authorization header
    const authHeader = req.headers.get("Authorization");
    const isAuthUser = await authorizationService(authHeader, ["admin"]);

    if (isAuthUser) {
      const extractData = await req.json();
      const {
        _id,
        name,
        description,
        category,
        price,
        packaging,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      } = extractData;

      const updatedProduct = await Product.findOneAndUpdate(
        { _id },
        {
          name,
          description,
          category,
          price,
          packaging,
          deliveryInfo,
          onSale,
          priceDrop,
          imageUrl,
        },
        { new: true }
      );

      if (updatedProduct) {
        return NextResponse.json({
          success: true,
          message: "Product updated successfully!",
          product: updatedProduct,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to update product! Please try again later.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Unauthorized access! Please login as an admin.",
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
