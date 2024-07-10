import Joi from "joi";
import connectToDB from "../../../database";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import User from "../../../models/user";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectToDB();
  const { name, email, password, role } = await req.json();

  //validate to schema
  const { error } = schema.validate({ name, email, password, role });
  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details ? error.details[0].message : "Validation error",
    });
  }
  try {
    const isUserAlreadyExists = await User.findOne({ email });
    if (isUserAlreadyExists) {
      return NextResponse.json({
        success: false,
        message:
          "User already exists with this email. Please try with different email.",
      });
    } else {
      const hashPasssword = await hash(password, 12);

      const newlyCreatedUser = await User.create({
        name,
        email,
        password: hashPasssword,
        role,
      });
      if (newlyCreatedUser) {
        return NextResponse.json({
          success: true,
          message: "User registered successfully",
        });
      }
    }
  } catch (error) {
    console.log("Error while new user registration. Please Try Again Later ");
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later.",
    });
  }
}
