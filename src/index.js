import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

//Middleware
const corsOptions = {
  origin: ["http://localhost:3001"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "SECRETTTTSESSIIIONNN",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000*60,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

//Routes

//Listen App
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
