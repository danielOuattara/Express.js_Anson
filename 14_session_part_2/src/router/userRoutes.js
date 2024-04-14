import { Router } from "express";
import { checkSchema } from "express-validator";
import { putUserValidationSchema } from "./../utilities/validationSchema.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  patchUser,
  updateUser,
} from "../handlers/userHandlers.js";
import {
  createUserBodyValidation,
  createUserEmailValidation,
  createUserNameValidation,
  createUserPasswordValidation,
  resolveUserIndex,
} from "../middlewares/userMiddlewares.js";

const router = Router();

router.get("/", getAllUsers);

router.get("/:userId", getOneUser);

router.post(
  "/",
  [
    createUserBodyValidation,
    createUserNameValidation,
    createUserEmailValidation,
    createUserPasswordValidation,
  ],
  createUser,
);

router.put(
  "/:userId",
  checkSchema(putUserValidationSchema),
  resolveUserIndex,
  updateUser,
);

router.patch("/:userId", resolveUserIndex, patchUser);

router.delete("/:userId", resolveUserIndex, deleteUser);

export default router;
