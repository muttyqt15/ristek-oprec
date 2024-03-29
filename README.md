# OKK Forge
LINK BACKEND: https://okk-forge.up.railway.app/okk/api (/okk/api is required)
LINK FRONTEND: https://okk-forge-green.vercel.app

OKK Forge adalah platform yang dirancang untuk memudahkan **pembuatan dan pengelolaan entitas terkait OKK UI**, seperti kelompok OKK, mentor, divisi panitia, jadwal rapat, sponsor, dan pembicara. Dengan fitur-fitur seperti operasi CRUD, OKK Forge memungkinkan pengguna untuk dengan mudah mengembangkan dan menguji API yang diperlukan untuk entitas-entitas tersebut. Ini membantu dalam menyelenggarakan OKK UI dengan lebih efisien.

# Open Recruitment Ristek
## Web Development
## Tugas Khusus - Muttaqin Muzakkir

_Tugas ini meminta kalian untuk membuat sebuah API development and testing platform sederhana yang dapat melakukan operasi create, read, update, and delete (CRUD) dan menampilkan hasil dari operasi tersebut. Selain itu, kalian juga diminta untuk menganalisis case study yang diberikan dan membuat API dari hasil analisis tersebut_

https://docs.google.com/document/d/1gWl623f5ZCxWCdDkkuNm4ypcu9O4Udc6lycO1anOPM0/

# Resources
https://www.dhiwise.com/post/collaborative-editing-with-react-monaco-editor
https://www.youtube.com/watch?v=G6TlV-Z-tMU&t=3s&ab_channel=ColbyFayock
https://www.youtube.com/watch?v=W1gvIw0GNl8&t=2444s&ab_channel=AnsontheDeveloper
https://www.youtube.com/watch?v=7qf9jA7YpwY&ab_channel=TheTechFlow

# OKK FORGE

## An amazing OKK management testing platform built with React, NestJS, TypeORM, and MySQL.

# INSTALLATION

## Pre requisites

### 1. Node.js should be installed

```bash
node --version
npm install
```

This project uses version 21.1 of Node.
### 2. MySQL CMD LINE (MySQL) should be installed

This project uses a MySQL database.

### 3. Internet Connection

Make sure you are established to a network in order to continue.

# LOCAL DEPLOYMENT

## 1. Clone the repository

### Make sure git is installed

```bash
https://github.com/muttyqt15/ristek-oprec.git
```

### If Git CLI is installed

```bash
gh repo clone muttyqt15/ristek-oprec
```

## 2. Install dependencies

Paste this into your cmd line in integrated terminal.

### Back end

```bash
cd nest-be
yarn
```

### Front end

```bash
cd react-fe
npm i
```



# 3. Initialization

Follow these steps for initialization!


### Back end

Go to the back end directory

```bash
cd nest-be
```


Create a **.env file** in your root directory and add these variables:

```bash
PORT=5000
# Keep this to yourself!
MYSQL_DB_HOST=localhost
MYSQL_DB_USERNAME=root
MYSQL_DB_PASSWORD=secretpass
MYSQL_DB_PORT=3306
MYSQL_DB_NAME=okk_forge
JWT_ACCESS_SECRET=WvbC7996wUxJrDjQGmC4+PNVoVsO0YkuAzk4feeLt4jDZT4yncoJHfinXlsSyyU8kbeJ7zXOAeb1uzGfM+uShqO620HOvYGDhcWJ8TDLJVA035ewZc9CRghrAW8mMkdSkfYS2mkVDKz1dXH5muGVJaiioQV0sxi3xesuHunvvKOjfJT8ckG5LGIvzKkX6zliwUTCtdaPG+DHJ2sJ67tgnNGsrcF1Czyb4qLVcXDe5nIrlQd+RccLteL7f08su5t122/NcKUqOHpXy+vTNfJxhRWpHyNeGAr1HuNDcHh/UJ3SdJhzYpseB6liQ1olekSxoHKl8B4NGaA==
JWT_REFRESH_SECRET=3DecJikQ4VsD8b4CaRWxIwZH3SQjbLZkDMMnUw4buknIuEnRODO93Yg7yw/ZkvM2F2FfpEVJCPObosnEoW2/14eMVXMFX7G4egpWVZU90X+WIpP+n0ITjhVnQTg6QWV8XI6CJBwJOb0He0iAI6DCMUkneGW8hXxQqJFEUsyj4jop07P+Z5Lu/FzSBHvk4OP00gryKMITcJVNeY4EPYFmSQKSiQImcLht8t3y6X6b/mlYPzLhn+wx+fHmxHEHDvjFeFp573eYJkuj/ehVoqNPeGOkDauCfG77ZX99LeLi5PAk3okQVWkUVzKxOOqzqNLMVcUvQMH/C4KQ==
```


Create a local database in MySQL using MySQL Cmd Line 8.0 and set the database URL in .env
```bash
CREATE DATABASE OKK_FORGE;
USE OKK_FORGE;
SHOW TABLES;
```

Set synchronize to true on app.module.ts in development environments!

## Run the server!

```bash
npm start
```



### Front end

Go to the front end directory

```bash
cd react-fe
```


Create a **.env file** and add these variables:

```bash
VITE_PROD_PORT=https://okk-forge.up.railway.app/okk/api # Replace this with your url
```

_So if your server runs on http://localhost:5000, insert http://localhost:5000 as BE_URL_
_It might look like this_

```bash
VITE_PROD_PORT=http://localhost:5000
```


## Run the client!

```bash
npm run dev
```

# Done! OKK FORGE should be up locally!




