# Referencing Loki APIs
## Module-based syntax
`loki-javascript-client` exposes multiple APIs that are organized into distinct modules. The available APIs (`data`, `environ`, `model`, `urn`, and `web`) each have their own module and those modules exist as properties on the Loki class. Each API module exports a class that contains all the methods for that API. So, for example, referencing the `data` API is as simple as using `loki.data.methodName`.
##  One step configuration
All the API classes are configured when an instance of the Loki class is created. The [initial configuration object](../configuration/initializing-loki.md) contains all the information that is necessary to configure the entire set of available APIs.