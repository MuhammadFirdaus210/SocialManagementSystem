# Proyek Full Stack

Proyek ini adalah aplikasi full stack yang menggunakan React.js untuk frontend, Express.js untuk backend, dan MongoDB sebagai database.

## Struktur Proyek

```
project-root/
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
├── backend/
│   ├── collection/
│   ├── src/
│   ├── package.json
│   └── README.md
└── README.md
```

## Frontend (React.js)

Frontend aplikasi ini dibangun menggunakan React.js dan berjalan di port 3000.

### Instalasi dan Menjalankan Frontend

1. Masuk ke direktori frontend:
   ```
   cd frontend
   ```

2. Install dependensi:
   ```
   npm install
   ```

3. Jalankan aplikasi:
   ```
   npm start
   ```

Aplikasi frontend akan berjalan di `http://localhost:3000`.

## Backend (Express.js)

Backend aplikasi ini menggunakan Express.js dan berjalan di port 4000.

### Instalasi dan Menjalankan Backend

1. Masuk ke direktori backend:
   ```
   cd backend
   ```

2. Install dependensi:
   ```
   npm install
   ```

3. Jalankan server:
   ```
   npm start
   ```

Server backend akan berjalan di `http://localhost:4000`.

## Database (MongoDB)

Aplikasi ini menggunakan MongoDB sebagai database. Pastikan Anda telah menginstal dan menjalankan MongoDB di sistem Anda.

### Koleksi

Koleksi database dapat ditemukan di direktori `backend/collection`. Pastikan untuk mengimpor koleksi ini ke dalam database MongoDB Anda sebelum menjalankan aplikasi.

## Menjalankan Aplikasi Secara Keseluruhan

1. Pastikan MongoDB berjalan di sistem Anda.
2. Jalankan backend (Express.js) di satu terminal.
3. Jalankan frontend (React.js) di terminal lain.
4. Akses aplikasi melalui browser di `http://localhost:3000`.

## Pengembangan Lebih Lanjut

Untuk informasi lebih lanjut tentang pengembangan dan konfigurasi, silakan merujuk ke file README.md di masing-masing direktori frontend dan backend.
