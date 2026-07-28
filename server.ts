import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
app.use(express.json());

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Shared Gemini AI instance
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "DUMMY_KEY_FOR_DEV",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// File Storage Setup
import fs from "fs";

const DATA_DIR = path.join(process.cwd(), "data_store");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return fallback;
}

function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// Products API Endpoints
app.get("/api/products", (req, res) => {
  const products = readJsonFile(PRODUCTS_FILE, null);
  res.json({ products });
});

app.put("/api/products", (req, res) => {
  const { products } = req.body;
  if (!Array.isArray(products)) {
    res.status(400).json({ error: "Se requiere un arreglo de productos." });
    return;
  }
  writeJsonFile(PRODUCTS_FILE, products);
  res.json({ success: true, products });
});

app.post("/api/products/reset", (req, res) => {
  const { products } = req.body;
  if (Array.isArray(products)) {
    writeJsonFile(PRODUCTS_FILE, products);
  } else if (fs.existsSync(PRODUCTS_FILE)) {
    fs.unlinkSync(PRODUCTS_FILE);
  }
  res.json({ success: true });
});

// Orders API Endpoints
app.get("/api/orders", (req, res) => {
  const orders = readJsonFile(ORDERS_FILE, null);
  res.json({ orders });
});

app.put("/api/orders", (req, res) => {
  const { orders } = req.body;
  if (!Array.isArray(orders)) {
    res.status(400).json({ error: "Se requiere un arreglo de pedidos." });
    return;
  }
  writeJsonFile(ORDERS_FILE, orders);
  res.json({ success: true, orders });
});

// System prompt for Mundo Sábila Assistant
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

// Health Endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
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
      // Fallback friendly response if key is absent
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
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text || "Disculpa, no pude generar una respuesta en este momento." });
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    res.json({
      reply: "Hola, te atendemos desde el Soporte en Vivo de Mundo Sábila. Puedes realizar tus compras de forma 100% segura con Mercado Pago o redirigirte directamente a Mercado Libre. ¿Deseas más información sobre la pulpa sin aloína o el estado de tu pedido?",
    });
  }
});

// Vite Middleware for development / static server for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
