import { NextResponse } from "next/server";
import { authorizationService } from "@/utils/authVerify";
import { getAllProducts } from "@/database/products";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("Authorization");
    const isAuthUser = await authorizationService(authHeader, ["admin"]);

    if (isAuthUser === "admin") {
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
    } else {
      return NextResponse.json({
        success: false,
        status: 401,
        message: "Unauthorized Access",
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
