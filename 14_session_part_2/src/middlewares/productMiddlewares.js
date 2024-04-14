export const productMiddleware = (req, res, next) => {
  console.log("Logging Products");
  next();
};
