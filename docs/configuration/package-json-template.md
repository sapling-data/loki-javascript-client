# `package.json` template
If you would like to store your Loki configuration in `package.json`, this template will get you started. This pattern is used in the `uploadToLoki` script found in [loki-vite-starter](https://github.com/sapling-data/loki-vite-starter). Simply add the code below to your `package.json` file and update with the appropriate variables.
``` js
...
"appInfo": {
  "loki": {
    "appName": "appName",
    "pageName": "pageName",
    "cloudPrefix": "cloudPrefix", // e.g., dev
    "cloudName": "cloudName" // e.g., saplingdata
  }
},
...
```