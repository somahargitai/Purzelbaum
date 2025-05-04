const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// Routes
const openaiRoutes = require("./routes/openai");
const databaseRoutes = require("./routes/database");

require("dotenv").config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/openai", openaiRoutes);
app.use("/api/database", databaseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app; // For testing purposes
