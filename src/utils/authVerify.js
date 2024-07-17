import User from "@/models/user";
import jwt from "jsonwebtoken";

export const authorizationService = async (authHeader, role) => {
  const token = authHeader
    ? authHeader.includes("Bearer")
      ? authHeader.split(" ")[1]
      : null
    : null;
  if (!token) return false;
  const data = jwt.verify(token, process.env.TOKEN_SECRET);

  const user = await User.findOne({ id: data.id });
  if (!user) return false;

  if (role.includes(user.role)) return true;
  return false;
};
