import { hash, compare } from "bcryptjs";
export const hashPassword = async (password: string) =>
  await hash(password, 12);

export const compareHashed = async (password: string, hashed: string) =>
  await compare(password, hashed);
