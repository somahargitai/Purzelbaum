import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import openaiRoutes from "./routes/openai.js";
import databaseRoutes from "./routes/database.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/hello", (req, res) => {
  res.send("Hello World 👋\n");
});
app.use("/api/openai", openaiRoutes);
app.use("/api/database", databaseRoutes);

// Proxy endpoint for Cloudflare R2
app.get("/api/sentences", async (req, res) => {
  try {
    const r2Url = process.env.CLOUDFLARE_R2_SENTENCES_URL;
    if (!r2Url) {
      return res.status(500).json({ error: "R2 URL not configured" });
    }

    const response = await fetch(r2Url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch sentences: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching sentences:", error);
    res.status(500).json({ error: "Failed to fetch sentences" });
  }
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, '0.0.0.0', () => {
  console.log("Server running on 0.0.0.0:3005")
})

export default app;
