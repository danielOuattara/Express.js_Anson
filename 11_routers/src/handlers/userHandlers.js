import { validationResult, matchedData } from "express-validator";
import { users } from "./../data/index.js";

// ----------------------- CRUD operations
// http://localhost:3000/api/v1/users?filter=name&value=na

export const getAllUsers = (req, res) => {
  // console.log("req = ", req["express-validator#contexts"]);
  const result = validationResult(req);
  // console.log("result = ", result);
  // console.log("result.array() = ", result.array());

  const filter = req.query.filter;
  const value = req.query.value;

  if (filter && value) {
    const newUsers = users.filter((user) => user[filter].includes(value));
    return res.send(newUsers);
  }
  return res.send(users);
};

//----------------------------------
export const getOneUser = (req, res) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) {
    return res
      .status(400)
      .send({ msg: "Bad Request. Invalid ID, expect a numeric ID" });
  }

  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).send({ msg: "User Not Found." });
  }
  return res.send(user);
};

//----------------------------------
export const createUser = (req, res) => {
  // console.log("req = ", req["express-validator#contexts"]);
  const result = validationResult(req);
  // console.log("result = ", result);
  // console.log("result.array() = ", result.array());

  // handle error
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const validatedData = matchedData(req);
  console.log("validatedData = ", validatedData);

  const newUser = { id: new Date().getTime(), ...validatedData };
  users.push(newUser);
  return res.status(201).json({ message: "post OK", users });
};

//----------------------------------
export const updateUser = (req, res) => {
  const result = validationResult(req);

  // handle error from validator
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const validatedData = matchedData(req);
  console.log("validatedData = ", validatedData);

  users[req.userIndex] = {
    id: parseInt(req.params.userId),
    ...validatedData,
  };
  return res.status(200).send(users);
};

//----------------------------------
export const patchUser = (req, res) => {
  users[userIndex] = { ...users[userIndex], ...req.body };
  return res.status(200).send(users);
};

//----------------------------------
export const deleteUser = (req, res) => {
  users.splice(req.userIndex, 1);
  return res.status(200).send(users);
};
