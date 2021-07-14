# Get started
## Installation
`loki-javascript-client` is not yet available as a published NPM package. Using the library will require use of the `npm link` command.
### Clone the repository
Clone the `loki-javascript-client` repository.
### Build the library
Run the `npm run rollup:build` command in your terminal. This will output a fresh production build of the library in the `/dist` directory.
### Run `npm link`
Run the `npm link` command in your terminal. This will make the production build available to other projects as if it were an install NPM package. You should see terminal output similar to the following (your output may differ depending on how your particular machine is configured):
```
/usr/local/Cellar/node/14.8.0/lib/node_modules/@sapling-data/loki-javascript-client
 -> /Users/<USER>/Documents/GitHub/loki-dev-client <USER>@<MACHINE_NAME> loki-dev-client
```
