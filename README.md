# Vue 3 + Express.js Project

This is a full-stack application using Vue 3 with Vuetify for the frontend and Express.js for the backend.

## Project Structure

```
.
├── client/          # Vue 3 frontend
└── server/          # Express.js backend
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v7 or higher)

## Setup Instructions

### Frontend (Vue 3 + Vuetify)

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

### Backend (Express.js)

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following content:
   ```
   PORT=3000
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The backend API will be available at `http://localhost:3000`

## Features

- Vue 3 with Composition API
- Vuetify for Material Design components
- Express.js backend with CORS support
- Environment variable configuration
- Hot-reload development servers
