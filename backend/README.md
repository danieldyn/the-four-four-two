# Importing a match in JSON format

## 1. Create the JSON

Example: If you were to add the **Champions League final** from **2013**, you would create the file
`data/champions_league/2013-ucl.json`. Ensure you have:

- 11 home players
- 11 away players
- correct positions
- shirt numbers
- full names
- correct date
- correct venue
- custom display names and/or a player alias (if necessary)
- correct team kit colours (contrast is also appreciated for readability)

**Important**: In spirit of how football fans refer to certain players, depending on the footballing
cultures and traditions, a blind "full name only" guessing logic is poor in the long run. Thus, the database
offers you the option to add a player alias and a custom display name, besides the mandatory full name. A great
example is in the `world_cup/2010-wc.json` file, where we have the winger Pedro Rodríguez. Everyone has known
him as just "Pedro" since his early days in the Spanish League. The database needs the full name to help us have
unique "full-name slugs", but the guess logic tries to see if an alias exists when checking player guesses.
Similarly, when displaying a correctly guessed player, the app checks whether the database contains a display name.
Also refer to `data/guidelines.txt` for a good starting point. It's just as fine to start from an existing curated JSON too.

## 2. Import the Match

Using the same example as above, you would have run from the root of the repository:

```bash
    npm run import:match backend/data/champions_league/2013-ucl.json
```

## 3. Verify the Database

From the root of the repository, run:

```bash
    npm run studio
```

Check the match table and, inside it, the lineup and player table.
You can edit any small issues manually without resetting the whole database.

## 4. Test Backend

Open the server:

```bash
    npm run dev
```

Then, in your browser, enter `localhost:4000/matches/id`, where `id` is the ID of the match according to the Prisma Studio.
