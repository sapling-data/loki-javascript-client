# Initializing Loki
## Configuration for dev
Note that configuration is only necessary when your code is not running in a Sapling cloud environment. For example, a front-end app that is deployed to a Sapling-hosted cloud with the appropriate `head` will load Loki jQuery and configure the environment without any additional setup. One helpful pattern is to wrap your configuration in a conditional such that it will only run in development mode and not in production. Here is an example from a Vue-based Vite project:
``` js
if (import.meta.env.MODE === 'development') {
  // your development mode configuration setup
} else {
  // any other setup code for production
}
```
Implementation may vary in other frameworks.
## Defining your config object
Once you've imported `loki-javascript-client` into your project (typically as `Loki`), you will need to initialize an instance of the Loki client. This is done by defining a config object and passing that object to the Loki class constructor:
``` js
import Loki from '../node_modules/@sapling-data/loki-javascript-client/dist/es-bundle';

const lokiConfig = {
  baseUrl,
  appName,
  cloudPrefix,
  auth: {
    username,
    password,
  },
};

const loki = new Loki(lokiConfig);
// or for the browser:
// window.loki = new Loki(lokiConfig);
```
::: tip TIP 
If you are writing code for the browser, it is recommended that you assign your new Loki instance to `window.loki`. This allows you to declare `loki` as a global variable and eliminates the need for syntax such as `this.loki...` or similar. This keeps Loki calls consistent between your local dev environment and your deployed production code.
:::
It is **recommended** that you [use your project's `package.json` file](./package-json-template.md) to store these options and then reference those variables rather than defining these options in your JavaScript itself, e.g.,
``` js
import packageJson from '../package.json';
...
const lokiConfig = {
  ...baseUrl: `https://${packageJson.appInfo.loki.cloudPrefix}.saplingdata.com`
}
```
## Options
### baseUrl
This is the base URL that will be used for calls to Loki. It will typically look similar to the following: `https://cloudPrefix.saplingdata.com`.
### appName
This is a string containing the codename of application you are working with.
### cloudPrefix
This is a string containing the subdomain of the cloud environment you are working with.
### auth
This option requires two properties, `username` and `password`. These properties must be strings that contain the username and password for the user account that you will be using to authorize your calls to Loki.
::: danger WARNING 
**Do not store these credentials as plain text in your JavaScript**.  
Define auth credentials in environment variables so that no user credentials are stored directly in your JavaScript. Use a `.env` file with a library such as [dotenv](https://github.com/motdotla/dotenv#readme) in Node or syntax such as `import.meta.env` in Vite (or the equivalent in your framework of choice).  
**Do not check your .env file into version control under any circumstances**.
:::