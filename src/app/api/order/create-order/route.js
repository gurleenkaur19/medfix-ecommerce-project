import connectToDB from "@/database";
import Cart from "@/models/cart";
import Order from "@/models/order";
import { authorizationService } from "@/utils/authVerify";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
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

    // Parse request body
    const data = await req.json();
    const { user, orderItems, shippingAddress, paymentMethod, totalPrice } =
      data;

    // Basic validation
    if (
      !user ||
      !orderItems ||
      !orderItems.length ||
      !shippingAddress ||
      !paymentMethod ||
      !totalPrice
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data",
        },
        { status: 400 }
      );
    }

    // Create a new order
    const saveNewOrder = await Order.create(data);

    if (saveNewOrder) {
      // Clear the user's cart after order creation
      await Cart.deleteMany({ userID: user });

      return NextResponse.json(
        {
          success: true,
          message: "Products are on the way!",
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create an order! Please try again.",
        },
        { status: 500 }
      );
    }
  } catch (e) {
    console.error("Error creating order:", e);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
