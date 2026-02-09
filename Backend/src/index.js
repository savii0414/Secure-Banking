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

// -----------------------------
// Database Connection
// -----------------------------
dbConnect();

const app = express();
const PORT = process.env.PORT || 7002;
const NODE_ENV = process.env.NODE_ENV || "development";

// -----------------------------
// CORS Middleware
// -----------------------------
app.use(cors({
  origin: process.env.CLIENT_URL,
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
    sameSite: NODE_ENV === "production" ? "none" : "lax", // cross-site cookies for prod
    secure: NODE_ENV === "production", // HTTPS only in prod
    httpOnly: true,
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

// -----------------------------
// Start Server
// -----------------------------
app.listen(PORT, () => {
  console.log(`Server is running`);
});
