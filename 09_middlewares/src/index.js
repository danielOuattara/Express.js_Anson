import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

//--------------- Data
const users = [
  { id: 1, name: "Johna Doe", username: "johnD" },
  { id: 2, name: "Anna Smith", username: "an88na" },
  { id: 3, name: "Mike Tyson", username: "micky_mouse" },
];

const products = [
  { id: 1, name: "cheese" },
  { id: 2, name: "eggs" },
  { id: 3, name: "milk" },
];

//----------------  Middlewares definition
const loginMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

const resolveUserIndex = (req, res, next) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) {
    return res
      .status(400)
      .send({ msg: "Bad Request. Invalid ID, expect a numeric ID" });
  }
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).send({ msg: "User Not Found." });
  }
  req.userIndex = userIndex;
  next();
};

/** ------------- middleware parsing incoming json data in req.body */
app.use(express.json());

// --------------- Apply middleware on the entire APP
app.use(loginMiddleware);

//---------------- CRUD operations
// http://localhost:3000/api/v1/users?filter=name&value=na
app.get("/", (_req, res) => {
  //   return res.send("Hello World, Welcome !");
  //   return res.json({ message: "Hello World, Welcome !" });
  //   return res.status(200).send("Hello World, Welcome !");
  return res.status(201).json({ message: "Hello World, Welcome !" });
});

//----------------------------------
app.get(
  "/api/v1/products",
  (req, res, next) => {
    console.log("Logging Products");
    next();
  },
  (_req, res) => {
    return res.json({ products });
  },
);

//----------------------------------
app.get("/api/v1/users", (req, res) => {
  const filter = req.query.filter;
  const value = req.query.value;

  if (filter && value) {
    const newUsers = users.filter((user) => user[filter].includes(value));
    return res.send(newUsers);
  }
  return res.send(users);
});

//----------------------------------
app.get("/api/v1/users/:userId", (req, res) => {
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
});

//----------------------------------
app.post("/api/v1/users/", (req, res) => {
  const newUser = { id: new Date().getTime(), ...req.body };
  users.push(newUser);
  return res.status(201).json({ message: "post OK", users });
});

//----------------------------------
app.put("/api/v1/users/:userId", resolveUserIndex, (req, res) => {
  users[req.userIndex] = { id: parseInt(req.params.userId), ...req.body };
  return res.status(200).send(users);
});

//----------------------------------
app.patch("/api/v1/users/:userId", resolveUserIndex, (req, res) => {
  users[userIndex] = { ...users[userIndex], ...req.body };
  return res.status(200).send(users);
});

//----------------------------------
app.delete("/api/v1/users/:userId", resolveUserIndex, (req, res) => {
  users.splice(userIndex, 1);

  return res.status(200).send(users);
});

//----------------------------------
app.use((req, res, next) => {
  console.log("End of logic");
  next();
});

//----------------------------------
app.listen(PORT, () =>
  console.log(`Running on port ${PORT}\nhttp://localhost:${PORT}`),
);
