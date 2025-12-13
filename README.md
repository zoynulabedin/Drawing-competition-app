# Drawing Competition App

This is a Next.js application for managing a drawing competition.

## Features

- **Student Registration**: Name, Parents Info, Mobile, Age Group, Photo Upload.
- **Auto-generated Roll Number**: Unique 3-digit roll number.
- **Instant Admit Card**: With QR Code and Print option.
- **Admin Dashboard**: Login (admin/admin123), View all students, Set positions.
- **Certificates**: Auto-generated certificates based on position.

## Setup

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Database Setup**:
   Ensure `.env` contains the correct `DATABASE_URL`.
   Then run:

   ```bash
   npx prisma db push
   ```

3. **Run Development Server**:

   ```bash
   npm run dev
   ```

4. **Open Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

## Credentials

- **Admin Login**:
  - Username: `admin`
  - Password: `admin123`

## Tech Stack

- Next.js 14
- Tailwind CSS
- Prisma ORM
- PostgreSQL (Neon DB)
