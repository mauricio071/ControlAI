import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/gemini", async (req, res) => {
  try {
    const response = await fetch(process.env.GEMINI_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao chamar API do Gemini" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
