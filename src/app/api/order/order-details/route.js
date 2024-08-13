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
    // console.log("Authorization Header:", authHeader);

    // Check if the user is authorized
    const isAuthUser = await authorizationService(authHeader, [
      "admin",
      "customer",
    ]);
    console.log("Authenticated User:", isAuthUser);

    if (!isAuthUser) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authenticated",
        },
        { status: 401 }
      );
    }

    // Extract the order ID from the request URL
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    console.log("Order ID:", id);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Order ID is required",
        },
        { status: 400 }
      );
    }

    // Fetch the order details by ID and populate the order items
    const extractOrderDetails = await Order.findById(id).populate(
      "orderItems.product"
    );
    console.log("Extracted Order Details:", extractOrderDetails);

    if (!extractOrderDetails) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found or failed to retrieve order details",
        },
        { status: 404 }
      );
    }

    // Ensure the user is accessing their own order, unless they are an admin
    if (
      isAuthUser.role !== "admin" &&
      extractOrderDetails.user.toString() !== isAuthUser._id.toString()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to view this order",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: extractOrderDetails,
    });
  } catch (e) {
    console.error("Error fetching order details:", e);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
