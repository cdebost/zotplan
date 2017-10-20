# ZotPlan

ZotPlan is a system designed to help UCI students plan their long-term course selections and checking their plans against course offerings and major requirements.

## Getting Started

### First-time Setup

1. Download node.js:

   Debian: `sudo apt-get install nodejs`

   or Mac, Windows: https://nodejs.org/en/

   or using NVM for easy version switching: https://github.com/creationix/nvm

   App tested with node.js v4.8 and npm 2.15.11, should work for any versions.

2. Download mongodb:

   Debian: `sudo apt-get install mongodb`

   or Mac, Windows:
   1. https://www.mongodb.com/download-center?jmp=homepage#community
   2. `mkdir /data/db` (default mongodb data directory) if it does not exist
   3. Run `monogd`

3. Configure database:
   1. Open the mongodb CLI: `mongo`
   2. Create databases: `use zotplan_development;`. The development database is needed at minimum for local development, a production database should also be created for running in prod.
   3. Create collections: `db.createCollection("courses")`, `db.createCollection("departments")`, `db.createCollection("plans")`, `db.createCollection("users")`. Collections are analogous to tables in SQL databases.

4. Install dependencies: Run `npm install` in the project root.

5. Populate the database with some data:
   1. Add a sample user for testing: `mongoimport -d zotplan_development -c users api/tests/datasets/dev-user.json`. The user's name is `dev@zotplan.com`, password is `password`, and has a simple plan built already.
   2. Populate courses and departments data using the webcrawler. The latest legit results of the crawler are stored under source control under `crawler/datasets/DATE/`. You can generate these results yourself with `npm run crawler`. Run `mongoimport -d zotplan_development -c courses crawler/datasets/*/courses.json` to add courses to the db, and `mongoimport -d zotplan_development -c departments crawler/datasets/*/departments.json` to add departments.

### Running the app

Run `npm run start:prod` to start the server. The app is served at `localhost:8000`. The server needs to be stopped and rebuilt every time any changes are made.

The default user account is `dev@zotplan.com`, with password `password`.

To avoid refreshing the server every time a change is made in the UI, you can also run a webpack dev server using `npm run start:dev`, which will run alongside the localhost:8000 server above. Visit the app at localhost:8080 instead, and UI changes will be reflected without having to restart the server. Any API changes will always require a restart of the prod server.

## Testing

Run the api tests using `npm test`.
