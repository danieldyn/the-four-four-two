# Importing a match in JSON format

## 1. Create the JSON

Example: If you were to add the **Champions League final** from **2013**, you would create the file
`data/champions_league/2013_final.json`. Ensure you have:

- 11 home players
- 11 away players
- correct positions
- shirt numbers
- full names
- correct date
- correct venue

## 2. Import the Match

Using the same example as above, you would have run from the root of the repository:

```bash
    npm run import:match backend/data/champions_league/2013_final.json
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
