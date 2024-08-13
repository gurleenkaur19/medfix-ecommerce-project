import connectToDB from "@/database";
import Order from "@/models/order";
import { NextResponse } from "next/server";
import { authorizationService } from "@/utils/authVerify";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    // Connect to the database
    await connectToDB();

    // Extract the Authorization header
    const authHeader = req.headers.get("Authorization");

    // Check if the user is authorized
    const isAuthUser = await authorizationService(authHeader, [
      "admin",
      "customer",
    ]);

    if (!isAuthUser) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authenticated",
        },
        { status: 401 }
      );
    }

    // Extract the user ID from the request URL
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // Fetch all orders for the user
    const extractAllOrders = await Order.find({ user: id }).populate(
      "orderItems.product"
    );

    if (extractAllOrders && extractAllOrders.length > 0) {
      return NextResponse.json({
        success: true,
        data: extractAllOrders,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "No orders found for this user",
        },
        { status: 404 }
      );
    }
  } catch (e) {
    console.error("Error fetching orders:", e);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
