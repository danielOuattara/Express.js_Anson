/**
 * 1/
 * In this course Anson artificially alters the session object
 * in the app.js, at `app.get('/', ...)`, so that when he makes
 * a request using tools like `thunder client` or `postman`,
 * the output of `console.log(req.sessionID)` will always be
 * the same on any request.
 *
 * But the game is totally different on a real Browser: there;
 * developers don't have to do anything on the session object
 * and the sessionID value will remain the same.
 *
 *
 * 2/
 * According to the present configuration of `express-sesson`,
 * there is a sessionStore, that is store on memory, but on
 * volatile memory. So all session data are lost on tension out.
 * One need to store the sessionStore on file or on database,
 * locally or remotely. This is the core of the next part of
 * the course about session
 * */

import express from "express";
import router from "./router/index.js";
import { loginMiddleware } from "./middlewares/index.js";
import cookieParser from "cookie-parser";
import session from "express-session";

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

app.use(express.json());
app.use(loginMiddleware);

app.use(router);

app.get("/", (req, res) => {
  // console.log("New request on `/`");
  // req.session.visited = true;
  // res.cookie("my-cookie", "my-cookie content", { maxAge: 60000 * 3 }); // 3min lifetime

  // res.cookie("my-secured-cookie", "my-secured-cookie content", {
  //   maxAge: 60000 * 3,
  //   signed: true,
  // }); // 3min lifetime

  // console.log(req.session);
  // console.log("-------------------");
  console.log(req.sessionID);
  // console.log("-------------------");

  /* 
    artificially alter session object to keep 
    sessionID  in changed in thunder client  */
  req.session.visited = true;

  return res.status(201).json({ message: "Hello World, Welcome !" });
});

//--------------------------------------
app.listen(PORT, () =>
  console.log(`Running on port ${PORT}\nhttp://localhost:${PORT}`),
);
