import { genSalt, hash, compare } from "bcrypt";

export const passwordHashed = async (password) => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

export const isPasswordOK = async (password, encrypted) => {
  return await compare(password, encrypted);
};
