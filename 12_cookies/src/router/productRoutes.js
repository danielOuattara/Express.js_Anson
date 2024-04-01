import { Router } from "express";
import { getAllProducts } from "../handlers/productHandlers.js";

const router = Router();

router.get("/", getAllProducts);

export default router;
