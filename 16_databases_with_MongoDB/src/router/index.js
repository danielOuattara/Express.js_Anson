import { Router } from "express";
import userRouter from "./userRoutes.js";
import productRouter from "./productRoutes.js";
import cartRouter from "./cartRoutes.js";
import authRouter from "./authRouter.js";

const router = Router();

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/users", userRouter);
router.use("/api/v1/products", productRouter);
router.use("/api/v1/cart", cartRouter);

export default router;
