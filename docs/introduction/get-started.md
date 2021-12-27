# Get started
## Installation
### Install the library via NPM or Yarn
```
npm i @sapling-data/loki-javascript-client
```
**or**
```
yarn add @sapling-data/loki-javascript-client
```
If you are using a build tool (e.g., Vite), installing loki-javascript-client as a dev dependency may be sufficient. This will ensure that the code from this library doesn't end up in your production build unnecessarily.
### Access the library in your project
Importing the library into your project using ES import syntax will look similar to the following:

```js
import Loki from '@sapling-data/loki-javascript-client/dist/umd-bundle';
```

**or**

```js
import Loki from '@sapling-data/loki-javascript-client/dist/es-bundle';
```

## Available formats
`loki-javascript-client` is currently available in UMD and ESM formats. These are accessible at `/dist/umd-bundle.js` (UMD) and `/dist/es-bundle.js` (ESM).

We recommend using the UMD version for developing Node projects (including scripting, REST APIs with Express, or any code that is intended to be run on a server) and the ESM version for code that will run in a browser (Vue, React, or other client-side frameworks/apps).