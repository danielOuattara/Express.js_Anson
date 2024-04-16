import { model, Schema } from "mongoose";
import { productSchema } from "./product.schema.js";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [productSchema],
});

const User = model("User", userSchema);

export default User;
