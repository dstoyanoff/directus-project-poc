# Directus Project POC

This project aims to create a simple POC on the possible developer-friendly process that Directus might provide. It's mostly based on hacks
to provide functionality that otherwise does not exist in Directus.

The main idea is to build everything locally in the src folder and then let Directus pick the compiled items from the dist folder,
just like a regular Node project. This would allow developers to easily work with the Directus ecosystem

## Init the project

First-time init the project to install Directus tables in the database.

Modify .env file and set `EXTENSIONS_PATH="./dist"` to make sure Directus will use the compiled files

`npm run bootstrap`

## Build extensions

Builds all extensions and outputs them to the `dist` folder.

For the purpose of the POC, only 1 extension is supported (current limitation of @directus/extension-sdk)

`npm run build`

## Start

Starts the project with the new extensions. Always build before start!

`npm start`

## Migrate

Generate migration from the current state.

`npm run migrate %name-of-migration%`
