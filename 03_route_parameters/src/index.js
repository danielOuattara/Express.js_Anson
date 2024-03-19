import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const users = [
  { id: 1, name: "John Doe", username: "johnD" },
  { id: 2, name: "Anna Smith", username: "an88na" },
  { id: 3, name: "Mike Tyson", username: "micky_mouse" },
];

const products = [
  { id: 1, name: "cheese" },
  { id: 2, name: "eggs" },
  { id: 3, name: "milk" },
];

app.get("/", (_req, res) => {
  //   res.send("Hello World, Welcome !");
  //   res.json({ message: "Hello World, Welcome !" });
  return res.status(200).send("Hello World, Welcome !");
  //   res.status(201).json({ message: "Hello World, Welcome !" });
});

app.get("/api/v1/users", (req, res) => {
  return res.send(users);
});

app.get("/api/v1/products", (req, res) => {
  return res.json({ products });
});

app.get("/api/v1/users/:userId", (req, res) => {
  if (isNaN(req.params.userId)) {
    return res
      .status(400)
      .send({ msg: "Bad Request. Invalid ID, expect a numeric ID" });
  }

  const user = users.find((user) => user.id === parseInt(req.params.userId));

  if (!user) {
    return res.status(404).send({ msg: "User Not Found." });
  }

  return res.send(user);
});

app.listen(PORT, () =>
  console.log(`Running on port ${PORT}\nhttp://localhost:${PORT}`),
);
