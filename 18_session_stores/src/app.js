import express from "express";
import appRouter from "./router/index.js";
import { loginMiddleware } from "./middlewares/index.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cookieParser("secured-cookie"));
app.use(
  session({
    secret: "Session_Super_Secret_String", //
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 3600, // 1 hour
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017",
      dbName: "anson-express-course",
      collectionName: "sessions",
    }),
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(loginMiddleware);
app.use(appRouter);

//----------

app.get("/", (req, res) => {
  req.session.visited = true;
  return res.status(201).json({ message: "Hello World, Welcome !" });
});

//--------------------------------------

mongoose
  .connect("mongodb://127.0.0.1:27017/anson-express-course")
  .then(() =>
    console.log(`Connection Succeeded to anson-express-course database `),
  )
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Running on port ${PORT} http://localhost:${PORT}`),
    ),
  )
  .catch((err) => {
    console.error(err);
  });
