import { validationResult, matchedData } from "express-validator";
import User from "../mongoose/schema/user.schema.js";

// ----------------------- CRUD operations
// http://localhost:3000/api/v1/users?filter=name&value=na

export const getAllUsers = async (req, res) => {
  const { filter, value } = req.query;
  const queryObject = {};

  if (filter && value) {
    queryObject[filter] = { $regex: value, $options: "i" };
  }
  const users = await User.find(queryObject);
  return res.send(users);
};

//----------------------------------
export const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({ msg: "User Not Found." });
    }
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

//----------------------------------
export const updateUser = async (req, res) => {
  const result = validationResult(req);

  // handle error from validator
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }
  const validatedData = matchedData(req);
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        ...validatedData,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

//----------------------------------
export const patchUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

//----------------------------------
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.userId);
  return res.status(200).send(`user ${req.params.userId} deleted successfully`);
};
