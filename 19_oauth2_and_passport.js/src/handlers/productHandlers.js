import { matchedData, validationResult } from "express-validator";
import Product from "../mongoose/schema/product.schema.js";

//--------------------

export const addProduct = async (req, res) => {
  if (!req.user || req.user._id.toString() !== req.session.passport.user) {
    return res.status(401).send("Customer is not identified !");
  }
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const validatedData = matchedData(req);
  const newProduct = new Product({ ...validatedData });
  try {
    await newProduct.save();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
  return res.status(201).json({ message: "post OK", newProduct });
};

//-------------------

export const getAllProducts = async (req, res) => {
  if (!req.user || req.user._id.toString() !== req.session.passport.user) {
    return res.status(401).send("Customer is not identified !");
  }
  const products = await Product.find();
  return res.status(200).json({ products });
};

//--------------------

export const getOneProduct = async (req, res) => {
  if (!req.user || req.user._id.toString() !== req.session.passport.user) {
    return res.status(401).send("Customer is not identified !");
  }

  const product = await Product.findById(req.params.productId);
  if (!product) {
    return res
      .status(400)
      .send(`No product found with id ${req.params.productId} `);
  }
  return res.json({ product });
};
