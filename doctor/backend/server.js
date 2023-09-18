const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDatabase = require("./database");
const usersRoutes = require("../routes/usersRoutes"); // Updated route import
const adminRoutes = require("../routes/adminRoutes");
const doctorRoute = require("../routes/doctorRoute");
const app = express();

dotenv.config({ path: "../backend/config.env" });

connectDatabase();

// Middleware
// Add the cors middleware to run frontend and backend on separate
app.use(cors());

// For showing detailed logs in the console
app.use(morgan("dev"));

// For parsing JSON data in requests
app.use(express.json());

// Routes
app.use("/api/v1/user", usersRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/doctor", doctorRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const port = process.env.PORT || 7000;

const server = app.listen(port, () => {
  console.log(
    `My Server is Successfully running on port:${process.env.PORT}`.yellow
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.error(`Error: ${err.message}`.red);
  // Gracefully exit the application if needed
   server.close(() => process.exit(1));
});
