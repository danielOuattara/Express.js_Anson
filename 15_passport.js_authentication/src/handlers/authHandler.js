import { matchedData, validationResult } from "express-validator";
import { users } from "../data/index.js";

//-----------------
export const register = (req, res) => {
  const result = validationResult(req);
  // handle error
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const userExists = users.find((user) => user.email === req.body.email);
  if (userExists) {
    return res
      .status(400)
      .send(
        `Duplicate email for ${req.body.email}. Please choose another email and try again`,
      );
  }

  const validatedData = matchedData(req);
  const newUser = { id: new Date().getTime(), ...validatedData };
  users.push(newUser);
  return res.status(201).json({ message: "post OK", users });
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
