import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export const dynamic = "force-dynamic";

const isValidObjectId = (id) => {
  return Types.ObjectId.isValid(id);
};

export async function GET(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    let productId = searchParams.get("id");
    if (!productId) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Product ID is required",
      });
    }

    // Trim whitespace from productId
    productId = productId.trim();

    // Validate the productId
    if (!isValidObjectId(productId)) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Invalid Product ID format",
      });
    }

    const getData = await Product.findById(productId);

    if (getData) {
      return NextResponse.json({ success: true, data: getData });
    } else {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "No product found",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Something went wrong! Please try again later.",
    });
  }
}
