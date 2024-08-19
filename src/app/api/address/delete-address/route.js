import connectToDB from "@/database";
import { authorizationService } from "@/utils/authVerify";
import Address from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Address ID is required",
      });
    }

    const authHeader = req.headers.get("Authorization");
    const isAuthUser = await authorizationService(authHeader, [
      "admin",
      "customer",
    ]);

    if (isAuthUser) {
      const deletedAddress = await Address.findByIdAndDelete(id);

      if (deletedAddress) {
        return NextResponse.json({
          success: true,
          message: "Address is deleted successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to delete address ! Please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
