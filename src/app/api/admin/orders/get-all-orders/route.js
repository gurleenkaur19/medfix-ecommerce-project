import { NextResponse } from "next/server";
import connectToDB from "@/database";
import { authorizationService } from "@/utils/authVerify";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const authHeader = req.headers.get("Authorization");
    const isAuthUser = await authorizationService(authHeader, ["admin"]);
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later.",
    });
  }
}
