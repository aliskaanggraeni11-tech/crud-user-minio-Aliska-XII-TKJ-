const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const Minio = require("minio");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Create table otomatis
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    photo TEXT
  )
`);

// Minio
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS,
  secretKey: process.env.MINIO_SECRET,
});

// Buat bucket kalau belum ada
minioClient.bucketExists("uploads", function (err) {
  if (err) {
    minioClient.makeBucket("uploads");
  }
});

// ROUTES

// CREATE
app.post("/users", async (req, res) => {
  const { name, email, photo } = req.body;

if (!name || !email) {
    return res.status(400).json({ error: "Name dan email wajib diisi" });
  }

  const emailRegex = /\S+@\S+\.\S+/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Format email tidak valid" });
  }

  const result = await pool.query(
    "INSERT INTO users (name, email, photo) VALUES ($1,$2,$3) RETURNING *",
    [name, email, photo]
  );
  res.json(result.rows[0]);
});

// READ
app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});

// UPDATE
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  await pool.query("UPDATE users SET name=$1, email=$2 WHERE id=$3", [name, email, id]);
  res.json({ message: "Updated" });
});

// DELETE
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM users WHERE id=$1", [id]);
  res.json({ message: "Deleted" });
});

// UPLOAD FOTO
app.post("/upload", upload.single("photo"), async (req, res) => {
  try {
    const file = req.file;

    if (file.size > 5 * 1024 * 1024) {
  return res.status(400).json({ error: "Foto maksimal 5MB" });
}

    const fileName = Date.now() + "-" + file.originalname;

    await minioClient.putObject(
      "uploads",
      fileName,
      file.buffer,
      file.size
    );

    const imageUrl = `http://localhost:9000/uploads/${fileName}`;

    res.json({ imageUrl });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Upload gagal" });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));