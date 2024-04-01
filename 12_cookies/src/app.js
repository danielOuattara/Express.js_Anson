import express from "express";
import router from "./router/index.js";
import { loginMiddleware } from "./middlewares/index.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser("secured-cookie"));

app.use(express.json());
app.use(loginMiddleware);

app.use(router);

app.get("/", (_req, res) => {
  res.cookie("my-cookie", "my-cookie content", { maxAge: 60000 * 3 }); // 3min lifetime

  res.cookie("my-secured-cookie", "my-secured-cookie content", {
    maxAge: 60000 * 3,
    signed: true,
  }); // 3min lifetime

  return res.status(201).json({ message: "Hello World, Welcome !" });
});

app.listen(PORT, () =>
  console.log(`Running on port ${PORT}\nhttp://localhost:${PORT}`),
);
