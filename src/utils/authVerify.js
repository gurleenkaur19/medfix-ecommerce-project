import User from "@/models/user";
import jwt from "jsonwebtoken";

export const authorizationService = async (authHeader, roles) => {
  try {
    // Extract token from the authorization header
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    // If no token is found, return false
    if (!token) {
      console.log("No token found in Authorization header");
      return false;
    }

    // Verify the token
    const data = jwt.verify(token, process.env.TOKEN_SECRET);

    // Find the user by ID
    const user = await User.findOne({ _id: data.id });
    if (!user) {
      console.log("User not found");
      return false;
    }

    // Check if the user's role is included in the allowed roles
    if (roles.includes(user.role)) {
      return { ...user.toObject(), role: user.role };
    } else {
      console.log("User role not allowed:", user.role);
      return false;
    }
  } catch (error) {
    console.error("Authorization error:", error);
    return false;
  }
};
