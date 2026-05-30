# URL Shortener API

A backend URL shortening service built with TypeScript, Express, PostgreSQL, and Prisma.

The application allows users to generate short URLs, redirect to the original destination, and track basic analytics such as click counts and last access timestamps.

## Features

* Create shortened URLs
* Redirect using short URLs
* Track click analytics
* Collision-resistant shortcode generation
* PostgreSQL database persistence
* Prisma ORM integration
* TypeScript support
* Layered architecture (Routes → Controllers → Services)

## Tech Stack

* TypeScript
* Node.js
* Express.js
* PostgreSQL
* Prisma ORM

## Project Structure

```txt
src/
├── controllers/
├── db/
├── routes/
├── services/
├── utils/
├── validators/
└── index.ts
```

## Database Schema

### URL

| Field          | Type      | Description              |
| -------------- | --------- | ------------------------ |
| id             | String    | Unique identifier        |
| originalUrl    | String    | Original destination URL |
| shortCode      | String    | Generated short code     |
| clickCount     | Int       | Total redirects          |
| createdAt      | DateTime  | Creation timestamp       |
| updatedAt      | DateTime  | Last update timestamp    |
| lastAccessedAt | DateTime? | Last redirect timestamp  |
| expiresAt      | DateTime? | Optional expiration date |
| isActive       | Boolean   | URL status               |

---

# API Documentation

## Create Short URL

Creates a shortened URL.

### Endpoint

```http
POST /api/url/shorten
```

### Request Body

```json
{
  "originalUrl": "https://google.com"
}
```

### Success Response

**Status:** `201 Created`

```json
{
  "id": "cmf123abc",
  "originalUrl": "https://google.com",
  "shortCode": "abc123",
  "shortUrl": "http://localhost:8000/abc123"
}
```

### Validation Error

**Status:** `400 Bad Request`

```json
{
  "message": "Invalid URL"
}
```

---

## Redirect to Original URL

Redirects users to the original URL.

### Endpoint

```http
GET /:shortCode
```

### Example

```http
GET /abc123
```

### Success Response

**Status:** `302 Found`

Redirects the client to:

```txt
https://google.com
```

### Not Found

**Status:** `404 Not Found`

```json
{
  "message": "Short URL not found"
}
```

---

## Get URL Analytics

Returns analytics and metadata for a shortened URL.

### Endpoint

```http
GET /api/url/:shortCode
```

### Example

```http
GET /api/url/abc123
```

### Success Response

**Status:** `200 OK`

```json
{
  "id": "cmf123abc",
  "originalUrl": "https://google.com",
  "shortCode": "abc123",
  "clickCount": 12,
  "createdAt": "2026-05-30T12:00:00.000Z",
  "updatedAt": "2026-05-30T12:10:00.000Z",
  "lastAccessedAt": "2026-05-30T12:09:30.000Z",
  "isActive": true
}
```

### Not Found

**Status:** `404 Not Found`

```json
{
  "message": "Short URL not found"
}
```

---

# Local Development

## Install Dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/url_shortener
PORT=8000
BASE_URL=http://localhost:8000
```

## Run Database Migrations

```bash
npx prisma migrate dev
```

## Generate Prisma Client

```bash
npx prisma generate
```

## Start Development Server

```bash
npm run dev
```

Server will start on:

```txt
http://localhost:8000
```

---

# Future Improvements

* Global error handling middleware
* Structured logging (Pino)
* URL expiration support
* URL disabling/deactivation
* Redis caching for redirect lookups
* Rate limiting
* Docker support
* Authentication and user-owned URLs

---

# Learning Objectives

This project was built to explore backend engineering concepts including:

* REST API design
* Service-based architecture
* Request validation
* Database modeling
* Prisma ORM
* PostgreSQL indexing
* Redirect handling
* Analytics tracking
* TypeScript backend development
* Scalability considerations
