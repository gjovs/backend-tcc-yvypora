import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const checkPassword = async (password: string, hash: string) => {
  const isValidPassword = await bcryptjs.compare(password, hash);
  return isValidPassword;
};

export const hashPassword = async (password: string) => {
  const hash = await bcryptjs.hash(password, 6);
  return hash;
};

export const isValidDate = (date: string): boolean => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  return date.match(regEx) != null;
};

export const getGender = (gender: string): number => {
  if (gender.toUpperCase() === "F") return 2;
  return 1;
};

export const genToken = (payload: any) => {
  const token = jwt.sign(payload, "12313123123", { expiresIn: "7d" });

  return token;
};
