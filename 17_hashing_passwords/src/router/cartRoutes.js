import { Router } from "express";
import { addToCart, getCart } from "../handlers/cartHandler.js";

const router = Router();

router.post("/", addToCart);
router.get("/", getCart);

export default router;
