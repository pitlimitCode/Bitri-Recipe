


# Ringkasan tugas :
Persyaratan :
  Gunakan Bahasa Inggris untuk nama File dan Fungsi
  Table (Recipe, User, Comment)
  Linter
  ENV
  Cors
  CRUD Create Read Update Delete
  Error Handling
  Pencarian Resep berdasarkan nama
  Resep terbaru maksimal 5
  Presentasikan (ppt) :
    apa yang telah Anda lakukan dalam minggu ini
      Express
      Body-parser
      Helmet
      Nodemon
      Postgre
    Ceritakan dan Demokan tentang proyek ini
    Flowchart Aplikasi
    Dokumentasi Postman
    Dapat didemokan menggunakan postman
  Upload/push tugas kamu ke GitHub dan gunakan nama yang profesional

Reqruitment optional :
  Pagination
  Comment by resep
  Resep by user

Optional other :
  Multer
  Crypto-js
  Validator
  Autentifikator


belum diperbaiki :

sudah diperbaiki :

catatan revisi setelah presentasi :
  Perbaikin penggunaan .env di db.js
  Perbaiki validasi inputan di CRUD, delete id tereksekusi 2x
  Buat pagination
  Buat multer untuk inputan file data, lengkap dengan limitasi data file
  upload tugas pakai file .gitignore dan mengabaikan node_modules
.env

persyaratan yang telah selesai sebelum presentasi:
  Gunakan Bahasa Inggris untuk nama File dan Fungsi
  Table (Recipe, User, Comment)
  Linter
  ENV
  Cors
  CRUD Create Read Update Delete
  Error Handling
  Pencarian Resep berdasarkan nama
  Resep terbaru maksimal 5
  Comment by resep
  Resep by user

DATABASE : 
1. users:
                type data   not_null?   unique?   primary_key?  foreign_key
id              int         y           y         y             
name            varchar     y           -         -             
email           varchar     y           -         -             
phone_number    varchar     -           -         -             
password        varchar     -           -         -             
avatar          varchar     -           -         -             

2. recipes:
id              integer     y           y         y             -
id_user         integer     y           -         -             users.id
name            varchar     y           -         -             -
ingredients     varchar     y           -         -             -
step            varchar     -           -         -             -
image           varchar     -           -         -             -
video           varchar     -           -         -             -

3. comments:
id
id_recipe
id_commenter
comment_text


# Week 3 - Tugas Beginer Backend, asli dari soal :
Buatlah API dari aplikasi dibawah ini 
https://www.figma.com/file/SUbBTYCq1e4ngRt20lSdqr/Food-Recipe?node-id=47%3A1273
Requirements:
  Flowchart Aplikasi
  Table (Recipe, User, Comment)
  CRUD
  Comment by resep (opsional)
  Resep by user (opsional)
  Pencarian Resep berdasarkan nama
  Resep terbaru maksimal 5
  Pagination (opsional)
  Linter
  Error Handling
  Cors
  ENV
  Dokumentasi Postman
  Gunakan Bahasa Inggris untuk nama File dan Fungsi
  Upload/push tugas kamu ke GitHub dan gunakan nama yang profesional
  Dapat didemokan menggunakan postman
  Presentasikan apa yang telah Anda lakukan dalam minggu ini
  Jelaskan dengan bahasa kalian sendiri apa itu dan konsep tentang:
    Node JS
    Express
    postgreSQL
    REST API
  Ceritakan dan Demokan tentang proyek ini