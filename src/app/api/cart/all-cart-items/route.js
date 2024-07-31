import connectToDB from "@/database";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({
        success: false,
        message: "Please login!",
      });
    const extractAllCartItems = await Cart.find({ userID: id }).populate(
      "productID"
    );

    if (extractAllCartItems) {
      return NextResponse.json({ success: true, data: extractAllCartItems });
    } else {
      return NextResponse.json({
        success: false,
        message: "No Cart items are found !",
        status: 204,
      });
    }
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}
