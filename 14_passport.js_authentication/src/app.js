import express from "express";
import router from "./router/index.js";
import { loginMiddleware } from "./middlewares/index.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import { users } from "./data/index.js";
import passport from "passport";
import "./strategies/local-strategy.js";

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
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(loginMiddleware);
app.use(router);

//----------
app.get("/", (req, res) => {
  req.session.visited = true;
  return res.status(201).json({ message: "Hello World, Welcome !" });
});

//----------
app.post("/api/v1/auth", passport.authenticate("local"), (req, res) => {
  const user = users.find(
    (user) =>
      user.username === req.body.username &&
      user.password === req.body.password,
  );
  if (!user) {
    return res.status(401).json({
      message: `Bad Credentials, please try again OR sign in and then log in`,
    });
  }
  req.session.user = user;
  console.log("req.session = ", req.session);
  console.log("-----------------------");
  res.status(200).send(user);
});

//----------
app.get("/api/v1/auth/status", (req, res) => {
  req.sessionStore.get(req.sessionID, (err, sessionData) => {
    if (err) return console.log(err);
    console.log("sessionData = ", sessionData);
    console.log("-----------------------");
  });
  return req.session.user
    ? res.status(200).send(req.sessionID)
    : res.status(401).send(`Not Authenticated`);
});

//----------
app.post("/api/v1/cart", (req, res) => {
  console.log(req.body);
  if (!req.session.user) return res.sendStatus(401);

  if (req.session.cart) {
    req.session.cart.push(req.body);
  } else {
    req.session.cart = [req.body];
  }
  console.log("req.session = ", req.session);
  return res.status(201).send(req.body);
});

//----------
app.get("/api/v1/cart", (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  return res.status(200).send(req.session.cart ?? []);
});

//--------------------------------------
app.listen(PORT, () =>
  console.log(`Running on port ${PORT}\nhttp://localhost:${PORT}`),
);
