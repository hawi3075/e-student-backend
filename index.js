import express from "express";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import { logger } from "./middleware/logger.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(logger);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the e-student portal backend!");
});

// API routes
app.use("/users", userRoutes);
app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
