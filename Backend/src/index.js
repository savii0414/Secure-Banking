import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import authRoutes from "./routes/authRoutes.js";
import "./config/passportConfig.js";
import MongoStore from "connect-mongo";

dotenv.config();

dbConnect();

const app = express();

const PORT = process.env.PORT || 7002;

// -----------------------------
// CORS Middleware
// -----------------------------
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN, // single origin from .env
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// -----------------------------
// Body Parsing
// -----------------------------
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// -----------------------------
// Session Middleware
// -----------------------------
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.CONNECTION_STRING,
    collectionName: "sessions",
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: "none",            // required for cross‑site cookies
    secure: true,                // required since both domains are HTTPS
  },
}));

// -----------------------------
// Passport
// -----------------------------
app.use(passport.initialize());
app.use(passport.session());

// -----------------------------
// Routes
// -----------------------------
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Secure Banking Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
