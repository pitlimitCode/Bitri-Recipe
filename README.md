# Week 3 - Tugas Beginer Backend

[Belum diperbaiki](#Belum-diperbaiki)  
[Sudah diperbaiki](#Sudah-diperbaiki)  
[Catatan revisi setelah presentasi](#Catatan-revisi-setelah-presentasi)  
[Persyaratan yang telah selesai sebelum presentasi](#Persyaratan-yang-telah-selesai-sebelum-presentasi)  
[Ringkasan tugas](#Ringkasan-tugas)  
[Format database kugunakan](#Format-database-kugunakan)  
[Soal asli / original](#Soal-asli-/-original)  

### Belum diperbaiki:
  - Perbaiki validasi inputan di CRUD, delete id tereksekusi 2x
  - Buat pagination
  - Buat multer untuk inputan file data, lengkap dengan limitasi data file

### Sudah diperbaiki:
  - Perbaiki penggunaan .env bersama db.js
  - push tugas di github pakai file .gitignore yang mengabaikan node_modules

### Catatan revisi setelah presentasi:
  - Perbaiki penggunaan .env bersama db.js
  - Perbaiki validasi inputan di CRUD, delete id tereksekusi 2x
  - Buat pagination
  - Buat multer untuk inputan file data, lengkap dengan limitasi data file
  - push tugas di github pakai file .gitignore yang mengabaikan node_modules

### Persyaratan yang telah selesai sebelum presentasi:
  - Gunakan Bahasa Inggris untuk nama File dan Fungsi
  - Table (Recipe, User, Comment)
  - Linter
  - ENV
  - Cors
  - CRUD Create Read Update Delete
  - Error Handling
  - Pencarian Resep berdasarkan nama
  - Resep terbaru maksimal 5
  - Comment by resep
  - Resep by user
---
## Ringkasan tugas:
Persyaratan:  
  - Gunakan Bahasa Inggris untuk nama File dan Fungsi  
  - Table (Recipe, User, Comment)  
  - Linter  
  - ENV  
  - Cors  
  - CRUD Create Read Update Delete  
  - Error Handling  
  - Pencarian Resep berdasarkan nama  
  - Resep terbaru maksimal 5  
  - Presentasikan (ppt) :  
    - apa yang telah Anda lakukan dalam minggu ini  
      - Express  
      - Body-parser  
      - Helmet  
      - Nodemon  
      - Postgre  
    - Ceritakan dan Demokan tentang proyek ini  
    - Flowchart Aplikasi  
    - Dokumentasi Postman  
    - Dapat didemokan menggunakan postman  
  - Upload/push tugas kamu ke GitHub dan gunakan nama yang profesional  

Persyaratan tambahan (opsional):
  - Pagination
  - Comment by resep
  - Resep by user

Persyaratan tambahan lain-lain (opsional):
  - Multer
  - Crypto-js
  - Validator
  - Autentifikator

---
### Format database yang ku buat: 
| 1. users:    | data type | not_null? | unique? | primary_key? | foreign_key |
| ------------ | --------- | --------- | ------- | -----------  | ----------- |
| id           | int       | y         |  y      | y            | -           |
| name         | varchar   | y         |  -      | -            | -           |
| email        | varchar   | y         |  -      | -            | -           |
| phone_number | int       | -         |  -      | -            | -           |
| password     | varchar   | -         |  -      | -            | -           |
| avatar       | varchar   | -         |  -      | -            | -           |

| 2. recipes:  | data type | not_null? | unique? | primary_key? | foreign_key |
| ------------ | --------- | --------- | ------- | ------------ | :---------: |
| id           | integer   | y         |  y      | y            | -           |
| id_user      | integer   | y         |  -      | -            | users.id    |
| name         | varchar   | y         |  -      | -            | -           |
| ingredients  | varchar   | y         |  -      | -            | -           |
| step         | varchar   | -         |  -      | -            | -           |
| image        | varchar   | -         |  -      | -            | -           |
| video        | varchar   | -         |  -      | -            | -           |

| 3. comments  | data type | not_null? | unique? | primary_key? | foreign_key |
| ------------ | --------- | --------- | ------- | ------------ | ----------- |
| id           | integer   |  y        |  y      | y            | -           |
| id_recipe    | integer   |  y        |  -      | -            | recipes.id  |
| id_commenter | integer   |  y        |  -      | -            | users.id    |
| comment_text | text      |  y        |  -      | -            | -           |
---
### Soal asli / original:
Buatlah API dari aplikasi dibawah ini  
https://www.figma.com/file/SUbBTYCq1e4ngRt20lSdqr/Food-Recipe?node-id=47%3A1273  
Requirements:
  - Flowchart Aplikasi
  - Table (Recipe, User, Comment)
  - CRUD
  - Comment by resep (opsional)
  - Resep by user (opsional)
  - Pencarian Resep berdasarkan nama
  - Resep terbaru maksimal 5
  - Pagination (opsional)
  - Linter
  - Error Handling
  - Cors
  - ENV
  - Dokumentasi Postman
  - Gunakan Bahasa Inggris untuk nama File dan Fungsi
  - Upload/push tugas kamu ke GitHub dan gunakan nama yang profesional
  - Dapat didemokan menggunakan postman
  - Presentasikan apa yang telah Anda lakukan dalam minggu ini
  - Jelaskan dengan bahasa kalian sendiri apa itu dan konsep tentang:
    - Node JS
    - Express
    - postgreSQL
    - REST API
  - Ceritakan dan Demokan tentang proyek ini