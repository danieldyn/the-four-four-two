# The Four-Four-Two

## Football Starting 11 Quiz Game

The Four-Four-Two is an open-source quiz game made for all the passionate football fans out there.
Behind it lies a simple idea: recalling as many starting players from famous matches as possible.
We may fondly remember names that belong to previous eras of the most prestigious competitions,
as well as reconnect with iconic teams and moments from our favourite leagues or tournaments.

The game is set to be played on a web browser (via a port on localhost for now) and reliant on a
locally managed Prisma database.

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

### 4. Helping Out

Even with my rather simplistic current view of the game, there is a lot to work on. Any help is welcome, especially if
you love football and enjoy testing your knowledge with such quizzes. That makes your reviews and suggestions valuable
input for the aim of this project. That being said, try out the game, **open issues**, **submit pull requests** and
let's see how far this concept can go.

Here is what surely needs polish (or adding from scratch):

- **Match Data**: Perhaps the most intuitive and non-programming part, a quiz game needs substantial data to enhance
    replayability and help cover as many competitions and eras as possible. I would strongly recommend to cover each
    category reasonably both in terms of density (i.e. not every World Cup Round of 16 match needs to be added when some
    years lack Semi Finals or Quarter Finals) and coverage (we shouldn't expect many people to recall many Champions League
    lineups from the 1990s, but international tournaments might be a better shout here). See the `README.md` file in the
    `backend/` directory for instructions about adding and testing new matches.
- **Documentation**: An app like this can grow quickly. Providing good, meaningful JSDoc descriptions for functions is
    great for easy development and future code migrations (like hosting the game on the web, workflows, etc.)
- **App Styles**: The app is somewhere between "just works" and "alright" visually. The UX is smooth because there aren't
    that many components to interact with and features to use.
- **Game Engine**: This is a massive TODO with many implications. Could be the draft of a scoring system, a game conclusion
    page for a session or anything that makes the game look complete and sensible.
