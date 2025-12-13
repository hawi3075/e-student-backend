// index.js (CORRECTED CODE)

import express from "express";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import { logger } from "./middleware/logger.js";
import cors from 'cors';

const app = express();
const PORT = 5000;

// 1. DEFINE CORS OPTIONS
const corsOptions = {
    // This explicitly allows requests ONLY from your frontend URL (localhost:3000)
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add all methods your API uses
    credentials: true, // Important for handling cookies/sessions if needed later
};

// Middleware
app.use(express.json());
// 2. APPLY CORS MIDDLEWARE
app.use(cors(corsOptions)); 
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