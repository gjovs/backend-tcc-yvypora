import jwt from "jsonwebtoken";

export const genToken = (payload: any) => {
  const token = jwt.sign(payload, "12313123123", { expiresIn: "7d" });

  return token;
};
