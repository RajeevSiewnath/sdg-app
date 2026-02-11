## Description

This monorepo contains a full-stack application organized into separate workspaces for the server, client, and shared code. All workspaces use **Node.js v25.2.1** to ensure a consistent development and runtime environment.

### Server Workspace

The server workspace is a **NestJS** application responsible for handling backend logic, APIs, and business rules. It runs on **Node.js v25.2.1**.

### Client Workspace

The client workspace is a **React** application that provides the frontend user interface. It also runs on **Node.js v25.2.1**.

### Shared Workspace

The shared workspace is intended to store reusable artifacts such as types, utilities, constants, and other modules that are consumed by both the server and client workspaces.

This structure promotes modularity, code reuse, and maintainability across the entire codebase.

## Installation

Follow the steps below to set up the project locally.

### 1. Configure Environment Variables

#### Server Workspace

Create a `.env` file in the **server workspace root** and add the following variables:

```env
DB_NAME=db.sqlite
ALLOWED_ORIGINS=http://localhost:5173
PORT=4932
```

#### Client Workspace

Create a `.env` file in the **client workspace root** and add the following variables:

```env
VITE_BACKEND_URL=http://localhost:4932
PORT=5173
```

---

### 2. Install Dependencies

From the repository root, install all npm packages:

```bash
npm run i
```

---

### 3. Run Database Migrations

Execute the migrations for the server workspace:

```bash
npm run migration:run -w server
```

---

### 4. Seed the Database

Run the database seeder for the server workspace:

```bash
npm run seed -w server
```

---

### 5. Start the Application

Start both the server and client in development mode:

```bash
npm run dev
```

---

### 5. App is ready to use

Visit localhost with the assigned PORT number in the .env file of the client (http://localhost:5173)

## TODO / Improvements

### Server

- The API currently only supports **GET** operations.  
- The API is missing **tests**.

### Client

- The UI is missing **routing** (e.g., `react-router`).  
- The UI is missing **create, update, and delete pages**.  
- The UI is missing a proper **application store**.  
- The UI is missing a proper **component structure** (could be refactored into smaller, reusable components).  
- The UI is missing **tests**.
