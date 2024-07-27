import { NextResponse } from "next/server";
import connectToDB from "@/database";
import Product from "@/models/product";
import { authorizationService } from "@/utils/authVerify";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const authHeader = req.headers.get("Authorization");
    const isAuthUser = await authorizationService(authHeader, ["admin"]);

    if (isAuthUser === "admin") {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Invalid ID",
        });
      }
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (deletedProduct) {
        return NextResponse.json({
          success: true,
          message: "Product deleted successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to delete product! Please try again later.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized to perform this action",
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
