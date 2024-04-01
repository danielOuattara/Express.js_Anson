import { products } from "../data/index.js";

export const getAllProducts = (_req, res) => {
  console.log("products = ", products);
  return res.json({ products });
};
