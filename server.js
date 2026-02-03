// imports
import express from "express";
import { logReq, globalErr } from "./middleware/middlewares.js";
import gradeRoutes from "./routes/gradeRoutes.js";
import dotenv from "dotenv";

// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || "";

// Middlewares
app.use(express.json());
app.use(logReq);

// Routes
app.use("/api/grades", gradeRoutes);

// Global Err MIddlewares
app.use(globalErr);

// Listener
app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});

// Index - table of contents for quick lookup of data.
// advantage - faster READ time, faster queries
// disadvantage - slower WRITE time