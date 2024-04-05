import { products } from "../data/index.js";

export const getAllProducts = (req, res) => {
  // console.log("req = ", req);
  console.log("req.headers.cookie = ", req.headers.cookie); // return no parsed cookies
  console.log("req.cookies = ", req.cookies); // parsed by 'cookie-parser'
  console.log("req.signedCookies = ", req.signedCookies); // parsed by 'cookie-parser'

  if (req.cookies["my-cookie"] === "my-cookie content") {
    return res.json({ products });
  }

  return res.status(401).send("Customer is not identified !");
};
