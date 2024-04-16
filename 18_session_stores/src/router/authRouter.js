import { Router } from "express";
import { status, login, logout, register } from "../handlers/authHandler.js";
import passport from "passport";
import "./../passport/local-strategy.js";
import {
  createUserBodyValidation,
  createUserEmailValidation,
  createUserNameValidation,
  createUserPasswordValidation,
} from "../middlewares/userMiddlewares.js";
const router = Router();

router.get("/status", status);
router.post(
  "/register",
  [
    createUserBodyValidation,
    createUserNameValidation,
    createUserEmailValidation,
    createUserPasswordValidation,
  ],
  register,
);
router.post("/login", passport.authenticate("local"), login);
router.post("/logout", logout);

export default router;
