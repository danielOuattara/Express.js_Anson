import { resolveUserIndex } from "./userMiddlewares.js";
import { productMiddleware } from "./productMiddlewares.js";

//----
const loginMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

//----
const endOfApp = (req, res, next) => {
  console.log("End of logic");
  next();
};

export { endOfApp, loginMiddleware, productMiddleware, resolveUserIndex };
