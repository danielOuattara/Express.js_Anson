import express from "express";
import router from "./router/index.js";
import { loginMiddleware } from "./middlewares/index.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(loginMiddleware);
app.use(router);
app.get("/", (_req, res) => {
  return res.status(201).json({ message: "Hello World, Welcome !" });
});

app.listen(PORT, () =>
  console.log(`Running on port ${PORT}\nhttp://localhost:${PORT}`),
);
