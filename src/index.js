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

// Tambah mobil
app.post("/mobil", async (c) => {
  try {
    const { nama, harga, tersedia } = await c.req.json();
    await c.env.DB.prepare(
      "INSERT INTO mobil (nama, harga, tersedia) VALUES (?, ?, ?)"
    )
      .bind(nama, harga, tersedia)
      .run();

    return c.json({ message: "Mobil ditambahkan" }, 201);
  } catch (err) {
    return c.text("Gagal menambahkan mobil: " + err.message, 500);
  }
});
