import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import "dotenv/config";

const app = express();
app.set("trust proxy", 1);
app.use(express.json());

// CORS manual sin librería extra
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === "production";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "DUMMY_KEY_FOR_DEV",
  httpOptions: { headers: { "User-Agent": "aistudio-build" } },
});

const SYSTEM_PROMPT = `Eres el Asistente Virtual Oficial de "Mundo Sábila & Electrónicos"...`; // pega tu prompt completo aquí

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) return res.status(400).json({ error: "Mensaje requerido" });

    if (!process.env.GEMINI_API_KEY) {
      return res.json({ reply: "¡Hola! Bienvenido a Mundo Sábila. Estoy listo para ayudarte con la Pulpa Natural libre de aloína y tus compras con Mercado Pago." });
    }

    const contents = [];
    if (Array.isArray(history)) {
      for (const m of history) {
        contents.push({ role: m.role === "user"? "user" : "model", parts: [{ text: m.text }] });
      }
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents,
      config: { systemInstruction: SYSTEM_PROMPT, temperature: 0.7 },
    });

    res.json({ reply: response.text || "Disculpa, no pude generar respuesta." });
  } catch (e) {
    console.error(e);
    res.json({ reply: "Soporte Mundo Sábila: compras 100% seguras con Mercado Pago. ¿Te ayudo con pulpa sin aloína o tu pedido?" });
  }
});

async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "custom" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get(/.*/, (req, res) => {
        if (req.path.startsWith("/api")) return res.status(404).json({ error: "Not found" });
        res.sendFile(path.join(distPath, "index.html"));
      });
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Mundo Sábila listo en puerto ${PORT}`);
  });
}

startServer();
