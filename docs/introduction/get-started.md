# Get started
## Installation
`loki-javascript-client` is not yet available as a published NPM package. Using the library will require use of the `npm link` command.
### Clone the repository
Clone the `loki-javascript-client` repository using GitHub.
### Build the library
Run the `npm run rollup:build` command in your terminal. This will output a fresh production build of the library in the `/dist` directory.
### Run `npm link`
Run the `npm link` command in your terminal. This will make the production build available to other projects as if it were an install NPM package. You should see terminal output similar to the following (your output may differ depending on how your particular machine is configured):
```
/usr/local/Cellar/node/14.8.0/lib/node_modules/@sapling-data/loki-javascript-client
 -> /Users/<USER>/Documents/GitHub/loki-dev-client <USER>@<MACHINE_NAME> loki-dev-client
```
### Access the library in your project
Now that you've built the library and made it accessible, you can start using `loki-javascript-client` to develop your project. **In your project**, run the command `npm link @sapling-data/loki-javascript-client`. This will connect the `/dist` folder in the cloned `loki-javascript-client` repository to the `node_modules` directory in your project. Now you will be able to use the library just like a normal NPM package. This is a test.
## Available formats
`loki-javascript-client` is currently available in UMD and ESM formats. We recommend using the UMD version for developing Node projects (including scripting, REST APIs with Express, or any code that is intended to be run on a server) and the ESM version for code that will run in a browser (Vue, React, or other client-side frameworks/apps).
###