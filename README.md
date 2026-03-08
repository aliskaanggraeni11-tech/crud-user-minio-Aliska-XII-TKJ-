# crud-user-minio-Aliska-XII-TKJ-
# CRUD User Microservice with MinIO

Project tugas **Administrasi Sistem Jaringan (ASJ)**
Membuat aplikasi **CRUD User dengan Microservice Architecture** yang terhubung dengan **MinIO Object Storage** dan dijalankan menggunakan **Docker Compose**.

---

## 👩‍💻 Identitas

**Nama:** Aliska Rizki Nur Anggraeni
**Kelas:** XII TKJ 1
**Sekolah:** SMKN 22 Jakarta
**Tahun:** 2025

---

## 📌 Deskripsi Project

Project ini merupakan aplikasi **CRUD (Create, Read, Update, Delete) User** yang dibuat menggunakan konsep **Microservice**.

Aplikasi terdiri dari:

* **Backend Service** → Mengelola API dan koneksi database
* **Frontend Service** → Tampilan web untuk pengguna
* **MinIO** → Digunakan sebagai object storage untuk menyimpan file
* **Docker Compose** → Untuk menjalankan seluruh service dalam satu environment

---

## 🧱 Arsitektur Project

Project ini terdiri dari beberapa komponen:

* Frontend
* Backend API
* MinIO Storage
* Docker Compose

Struktur folder:

```
crud-microservice
│
├── backend
│
├── frontend
│
├── docker-compose.yml
│
└── README.md
```

---

## ⚙️ Teknologi yang Digunakan

* Node.js
* Express.js
* Docker
* Docker Compose
* MinIO
* HTML / CSS / JavaScript

---

## 🚀 Cara Menjalankan Project

### 1️⃣ Clone Repository

```bash
git clone https://github.com/aliskaanggraeni11-tech/crud-user-minio-Aliska-XII-TKJ-.git
```

Masuk ke folder project

```bash
cd crud-user-minio-Aliska-XII-TKJ-
```

---

### 2️⃣ Jalankan Docker

Pastikan **Docker Desktop sudah berjalan**, lalu jalankan:

```bash
docker compose up --build
```

---

### 3️⃣ Akses Aplikasi

Frontend dapat diakses di:

```
http://localhost:3000
```

MinIO Console:

```
http://localhost:9001
```

---

## 📷 Fitur Aplikasi

* Menambahkan data user
* Melihat daftar user
* Mengedit data user
* Menghapus data user
* Upload file ke MinIO

---

## 📂 Repository

Link repository project:

https://github.com/aliskaanggraeni11-tech/crud-user-minio-Aliska-XII-TKJ-

---

## ✅ Status Project

✔ Project berhasil dijalankan menggunakan Docker Compose
✔ Backend dan Frontend terhubung
✔ File dapat disimpan di MinIO

---

## 📖 Catatan

Project ini dibuat sebagai **tugas praktik mata pelajaran Administrasi Sistem Jaringan (ASJ)** dengan tujuan memahami:

* Microservice Architecture
* Containerization dengan Docker
* Object Storage menggunakan MinIO

