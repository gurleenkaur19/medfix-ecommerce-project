import { NextResponse } from "next/server";
import { authorizationService } from "@/utils/authVerify";
import { getAllProducts } from "@/database/products";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const token = authorizationService(req.headers.get("authorization"));
    const isAdmin = authorizationService(
      req.headers.get("authorization"),
      true
    );
    if (!token && !isAdmin)
      return NextResponse.json({
        success: false,
        status: 401,
        message: "Unauthorized Access",
      });
    const extractAllProducts = await getAllProducts();
    if (extractAllProducts) {
      return NextResponse.json({
        success: true,
        data: extractAllProducts,
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: "No Products Found",
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
