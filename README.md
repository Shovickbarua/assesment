# Project & Task Management Portal

A full-stack Project & Task Management Portal built with **React.js**, **Vite**, **Laravel**, and **MySQL**.

# Requirements

Before running the project, make sure the following are installed:

* PHP 8.2+
* Composer
* MySQL 8+
* Node.js 18+
* npm
* Git

# Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

## 1. Install PHP dependencies

```bash
composer install
```

## 2. Configure environment

Copy the example environment file:

```bash
cp .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

## 3. Configure database

Create a MySQL database, for example:

```text
task_management
```

Then update the database configuration in `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=task_management
DB_USERNAME=root
DB_PASSWORD=
```

Update `DB_USERNAME` and `DB_PASSWORD` according to your local MySQL configuration.

## 4. Run migrations

Run the database migrations:

```bash
php artisan migrate
```

This will create the required database tables.

## 5. Start the Laravel API

```bash
php artisan serve
```

The API will normally be available at:

```text
http://127.0.0.1:8000
```

API endpoints are available under:

```text
http://127.0.0.1:8000/api
```

---

# Frontend Setup

Open a new terminal and navigate to the frontend:

```bash
cd frontend
```

## 1. Install dependencies

```bash
npm install
```

## 2. Start the development server

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# Running the Application

You need to run both the backend and frontend.

### Terminal 1 — Laravel

```bash
cd backend
php artisan serve
```

### Terminal 2 — React

```bash
cd frontend
npm run dev
```

Then open the frontend URL shown by Vite:

```text
http://localhost:5173
```

---

# Database

The application uses MySQL.

The database schema is managed through Laravel migrations.

To create the database tables:

```bash
php artisan migrate
```

