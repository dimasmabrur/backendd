import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

// Middleware CORS agar frontend Vue bisa akses API
app.use(
  "/mobil/*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })
);

// Test endpoint
app.get("/mobil", async (c) => {
  try {
    const { results } = await c.env.DB.prepare("SELECT * FROM mobil").all();
    return c.json(results);
  } catch (err) {
    return c.text("Gagal mengambil data mobil: " + err.message, 500);
  }
});
