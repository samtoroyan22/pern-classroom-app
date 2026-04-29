# Classroom App - PERN Academic Management System

This project is a full-stack academic management platform built with the PERN stack (PostgreSQL, Express, React, Node.js). It provides a multi-role system for Admins, Teachers, and Students, enabling efficient class management, scheduling, and analytics.

The application follows a decoupled architecture, where a Node.js/Express backend serves a modern React frontend powered by Refine. It leverages PostgreSQL (Neon) with Drizzle ORM for type-safe database operations and integrates modern tools for authentication, security, and media management.

## Features

- Multi-Role Authentication: Secure authentication system with role-based access (Admin, Teacher, Student).
- Subject Management: Create and manage subjects with filtering and assignment capabilities.
- Class Management: Create classes, assign teachers, manage capacity and schedules.
- Image Uploads: Upload and manage profile images using Cloudinary.
- Validation & Type Safety: Strong validation using Zod and TypeScript.
- Secure Backend: Protection with Arcjet (rate limiting, bot protection, etc.).
- Scalable Architecture: Clean, modular structure for easy scaling and maintenance.
- Responsive UI: Fully responsive interface for desktop and mobile.
- Reusable Components: Built with shadcn/ui and Tailwind CSS.

## Technologies Used

### Frontend

- React
- Refine
- TypeScript
- Tailwind CSS
- shadcn/ui + Radix UI
- Zod

### Backend

- Node.js
- Express.js
- PostgreSQL (Neon)
- Drizzle ORM
- Better Auth
- Arcjet
- Cloudinary

## Setup and Installation

### Prerequisites

- Node.js
- npm
- Git

### Steps

1. Clone the repository:

```bash
git clone https://github.com/samtoroyan22/pern-classroom-app
cd pern-classroom-app
```

2. Install dependencies:
npm install

Set up environment variables:

Create a .env file in the root directory:
```bash
VITE_BACKEND_BASE_URL="http://localhost:8000/api/"

VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
VITE_CLOUDINARY_UPLOAD_URL=
```
Run the project:
npm run dev
Open in browser:

http://localhost:3000

## Project Structure

frontend/ – React + Refine application
backend/ – Node.js + Express API
db/ – Database schema (Drizzle ORM)
components/ – Reusable UI components
features/ – Business logic modules

### Troubleshooting
If the backend does not start, check environment variables and port configuration.
If authentication fails, verify Better Auth setup and credentials.
If images are not uploading, check Cloudinary configuration.
If database issues occur, ensure PostgreSQL connection is valid.
For UI issues, verify Tailwind CSS setup and responsiveness.


## License This project is licensed under the MIT License. Copyright (c) 2026 Samvel Toroyan
