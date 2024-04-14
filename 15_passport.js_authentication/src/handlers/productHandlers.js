import { products } from "../data/index.js";

//--------------------
export const getAllProducts = (req, res) => {
  if (!req.user || req.user.id !== req.session.passport.user) {
    return res.status(401).send("Customer is not identified !");
  }
  return res.status(200).json({ products });
};

//--------------------
export const getOneProduct = (req, res) => {
  if (!req.user || req.user.id !== req.session.passport.user) {
    return res.status(401).send("Customer is not identified !");
  }

  const product = products.find(
    (product) => product.id === parseInt(req.params.productId, 10),
  );

  if (!product) {
    return res
      .status(400)
      .send(`No product found with id ${req.params.productId} `);
  }
  return res.json({ product });
};
