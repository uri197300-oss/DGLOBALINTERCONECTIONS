import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import "dotenv/config";

const app = express();
app.set("trust proxy", 1);
app.use(cors());
app.use(express.json());

// Hostinger te inyecta el PORT automáticamente
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === "production";

// Shared Gemini AI instance
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "DUMMY_KEY_FOR_DEV",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const SYSTEM_PROMPT = `
Eres el Asistente Virtual Oficial e Inteligente de "Mundo Sábila & Electrónicos", la tienda virtual de productos naturales de Aloe Vera (Propiedad de Miguel Ángel López Balbuena) y electrónicos con enlace oficial a Mercado Libre y Mercado Pago.

Detalles Clave de los Productos:
1. Pulpa Natural de Aloe Vera Orgánica (750g) - $155 MXN (antes $180). Carnita de sábila 100% orgánica, comestible y untable, libre de aloína y sin azúcar añadida. Certificación Kosher Pareve.
2. Jugo (Pulpa) De Aloe Vera 1 Lt - $145 MXN. 100% Natural Certificado, sin sodio, sin gluten, sin azúcar. Ideal para tomar en ayunas.
3. Pulpa de Sábila en Sobres para Viaje (Caja con 20 sobres de 60g) - $150 MXN (antes $220). Sabor mora, antiácido natural instantáneo para gastritis, reflujo y acidez. No requiere refrigeración.
4. Gel Facial y Corporal (250ml) - $180 MXN. Regenerador celular, calmante post-solar.
5. Crema Anti-Edad de Aloe y Colágeno (100g) - $210 MXN.
6. Shampoo Natural Aloe y Sangre de Drago (500ml) - $175 MXN. Anti-caída.
7. Audífonos Gamer Estéreo HD - $349 MXN.
8. Báscula Digital para Envíos y Cocina - $289 MXN.

Información sobre Compras y Envíos:
- Las compras se procesan de forma ultrasegura mediante Mercado Libre y Mercado Pago.
- Se aceptan múltiples métodos de pago: Tarjetas de Crédito/Débito, Mercado Pago, PayPal y Transferencias Bancarias (SPEI / OXXO).
- Los envíos se realizan a toda la República Mexicana a través de Mercado Envíos con trazabilidad completa.
- El administrador principal del sistema es Uri (uri197300@gmail.com) con permisos globales para gestión de inventario, pedidos y auditoría.

Instrucciones de Respuesta:
- Sé amable, educado, claro y profesional.
- Explica los beneficios digestivos de tomar la pulpa en ayunas y la garantía de que es sin aloína (libre de irritantes intestinales).
- Ofrece orientación para comprar directo por Mercado Libre con botón de compra segura.
- Si preguntan por soporte técnico de electrónicos, ofrece asesoría paso a paso.
`;

// Health Endpoint - Hostinger lo usa para verificar que estás vivo
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", env: process.env.NODE_ENV, timestamp: new Date().toISOString() });
});

// Gemini Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: "El mensaje es requerido." });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.json({
        reply: `¡Hola! Bienvenido a Mundo Sábila. Estoy listo para ayudarte con tus dudas sobre la Pulpa Natural de Aloe Vera (100% libre de aloína y azúcar, certificada Kosher) o tus compras protegidas con Mercado Pago. ¿En qué te puedo asesorar hoy?`,
      });
      return;
    }

    const contents = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        });
      }
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash", // corregido, era 3.6-flash
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text || "Disculpa, no pude generar una respuesta en este momento." });
  } catch (error: any) {
    console.error("Error Gemini:", error);
    res.json({
      reply: "Hola, te atendemos desde el Soporte en Vivo de Mundo Sábila. Puedes realizar tus compras de forma 100% segura con Mercado Pago o redirigirte directamente a Mercado Libre. ¿Deseas más información sobre la pulpa sin aloína o el estado de tu pedido?",
    });
  }
});

// Vite / Static server
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      // Fallback SPA - Express 5 compatible
      app.get(/.*/, (req, res) => {
        // No interceptar /api
        if (req.path.startsWith("/api")) return res.status(404).json({ error: "Not found" });
        res.sendFile(path.join(distPath, "index.html"));
      });
    } else {
      console.warn("⚠️ dist/ no existe. Corre 'bun run build' antes.");
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Mundo Sábila corriendo en puerto ${PORT} - ENV: ${process.env.NODE_ENV}`);
  });
}

startServer();
