# The Four-Four-Two

## Football Starting 11 Quiz Game

### 1. Setting up the Environment

All dependencies and scripts are managed by three `package.json` files: one in the root of the repository,
one in the `backend/` and the last in the `frontend/` directory. The very first step of the setup is to install
all required packages using the following commands from the root of the repository:

```bash
    npm install # Project-wide dependencies
    npm install --prefix backend # Backend-only dependencies
    npm install --prefix frontend # Frontend-only dependencies
```

### 2. Initialising the Database

Before running the app, you also need to generate the SQLite database. Also from the root of the repo, run this command:

```bash
    npm run reset-db
```

You will notice this also triggers the reimporting of all JSON files stored in the `backend/data/`. This happens
because of the `backend/prisma/seed.ts` script. It is necessary to generate your `backend/prisma/dev.db` file, which
is ultimately a binary file that should never be commited or push to the repo and only used locally.

### 3. Running the App

The site (Vite frontend) will be at `localhost:5173`, whereas the server (backend API) can be found at `localhost:4000`.
The only command you need is:

```bash
    npm run dev
```

For other running options, see `package.json` from the root of the repo.
