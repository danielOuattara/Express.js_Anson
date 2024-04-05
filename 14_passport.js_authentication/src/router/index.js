import { Router } from "express";
import productRoutes from "./productRoutes.js";
import userRoutes from "./userRoutes.js";

const router = Router();

router.use("/api/v1/products", productRoutes);
router.use("/api/v1/users", userRoutes);

export default router;
