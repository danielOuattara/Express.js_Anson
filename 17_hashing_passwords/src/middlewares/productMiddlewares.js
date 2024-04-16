import { query, body } from "express-validator";

export const productMiddleware = (req, res, next) => {
  console.log("Logging Products");
  next();
};

//-------
export const addProductBodyValidation = body(["name", "price"])
  .notEmpty()
  .withMessage("name & price cannot be empty");

//-------
export const addProductNameValidation = body(["name"])
  .isString()
  .withMessage("name must be string")
  .isLength({ min: 2, max: 20 })
  .withMessage("name min-length: 2 &  max-length: 12");
//-------
export const addProductPriceValidation = body(["price"])
  .isNumeric()
  .withMessage("price must be string")
  .isLength({ min: 0 })
  .withMessage("username min-length: 2 &  max-length: 12");
