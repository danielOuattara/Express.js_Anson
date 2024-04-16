import { matchedData, validationResult } from "express-validator";
import User from "../mongoose/schema/user.schema.js";
import { passwordHashed } from "../utilities/bcrypt-helper.js";

//-----------------
export const register = async (req, res) => {
  const result = validationResult(req);
  // handle express-validation error
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const validatedData = matchedData(req);
  const hashedPassword = await passwordHashed(validatedData.password);
  validatedData.password = hashedPassword;
  const newUser = new User({ ...validatedData });

  try {
    await newUser.save();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
  return res.status(201).json({ message: "post OK", newUser });
};

//-----------------
export const login = (req, res) => {
  console.log(`\n-->Inside /api/v1/auth`);
  console.log("\nreq.user = ", req.user);
  console.log("\nreq.session = ", req.session);
  console.log("-----------------------");
  res.status(200).send("Login Success");
};

//-----------------
export const status = (req, res) => {
  console.log(`\n-->Inside /api/v1/auth/status`);
  console.log("\nreq.user = ", req.user);
  console.log("\nreq.session = ", req.session);

  return req.user
    ? res.status(200).send(req.user)
    : res.status(401).send(`Not Authenticated`);
};

//--------------------
export const logout = (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logout(function (err) {
    if (err) return res.sendStatus(400);
    res.sendStatus(200);
  });
};
