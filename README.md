# Food Rescue Hub

A full-stack web platform that connects restaurants with surplus food to NGOs, helping reduce food waste and feed communities in need.

Restaurants can post available food listings, NGOs can browse and claim them in real time, and both parties manage pickups through role-based dashboards.

---

## Features

- **Dual user roles** — Register as a **restaurant** or **NGO** with organization details
- **Food listings** — Restaurants post surplus food with title, description, quantity, and pickup time
- **Browse & claim** — NGOs view available listings and claim food with one click
- **Role-based dashboards** — Restaurants track posted listings and claim status; NGOs see claimed pickups with contact details
- **Real-time notifications** — NGOs receive live alerts via Socket.io when new listings are posted
- **JWT authentication** — Secure login and protected API routes

---

## Tech Stack

| Layer      | Technologies                                      |
| ---------- | ------------------------------------------------- |
| Frontend   | Next.js 15, React 19, Tailwind CSS 4, Axios       |
| Backend    | Node.js, Express 5, Socket.io                     |
| Database   | MongoDB with Mongoose                             |
| Auth       | JWT, bcryptjs                                     |

---

## Project Structure

```
Food-rescue-hub/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Auth & listing business logic
│   ├── middleware/      # JWT auth middleware
│   ├── models/          # User & Listing schemas
│   ├── routes/          # API route definitions
│   └── server.js        # Express + Socket.io entry point
│
└── frontend/
    ├── app/             # Next.js App Router pages
    ├── components/      # Reusable UI components
    └── context/         # Auth context provider
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/) — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd Food-rescue-hub
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Start the backend server:

```bash
npm start
```

The API runs at `http://localhost:5000` by default.

### 3. Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable     | Description                          |
| ------------ | ------------------------------------ |
| `MONGO_URI`  | MongoDB connection string            |
| `JWT_SECRET` | Secret key for signing JWT tokens    |
| `PORT`       | Server port (default: `5000`)        |

### Frontend (`frontend/.env.local`)

| Variable               | Description              |
| ---------------------- | ------------------------ |
| `NEXT_PUBLIC_API_URL`  | Backend API base URL     |

---

## How It Works

1. **Restaurants** register, log in, and create food listings from the **Create Listing** page.
2. **NGOs** browse available food on the **Available Food** page and claim listings they can pick up.
3. When a restaurant posts a new listing, connected NGOs receive a **real-time notification** via Socket.io.
4. Both roles use the **Dashboard** to track their listings — restaurants see claim status and NGO contact info; NGOs see pickup details for claimed food.

---

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint    | Auth | Description              |
| ------ | ----------- | ---- | ------------------------ |
| POST   | `/register` | No   | Register a new user      |
| POST   | `/login`    | No   | Log in and receive token |
| GET    | `/me`       | Yes  | Get current user profile |

### Listings (`/api/listings`)

| Method | Endpoint       | Auth | Description                        |
| ------ | -------------- | ---- | ---------------------------------- |
| GET    | `/`            | No   | Get all available listings         |
| POST   | `/`            | Yes  | Create a new listing (restaurant)  |
| PUT    | `/claim/:id`   | Yes  | Claim a listing (NGO)              |
| GET    | `/mylistings`  | Yes  | Get restaurant's own listings      |
| GET    | `/claimed`     | Yes  | Get NGO's claimed listings         |

Protected routes require the `x-auth-token` header with a valid JWT.

---

## Frontend Pages

| Route           | Description                              |
| --------------- | ---------------------------------------- |
| `/`             | Landing page with hero and how-it-works  |
| `/register`     | User registration                        |
| `/login`        | User login                               |
| `/listings`     | Browse available food listings           |
| `/new-listing`  | Create a listing (restaurants only)      |
| `/dashboard`    | Role-based dashboard (authenticated)     |

---

## Scripts

### Backend

```bash
npm start    # Start the production server
```

### Frontend

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

---

## License

ISC
