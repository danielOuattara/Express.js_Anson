import { Router } from "express";
import { checkSchema } from "express-validator";
import { putUserValidationSchema } from "./../utilities/validationSchema.js";
import {
  deleteUser,
  getAllUsers,
  getOneUser,
  patchUser,
  updateUser,
} from "../handlers/userHandlers.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:userId", getOneUser);
router.put("/:userId", checkSchema(putUserValidationSchema), updateUser);
router.patch("/:userId", patchUser);
router.delete("/:userId", deleteUser);

export default router;
