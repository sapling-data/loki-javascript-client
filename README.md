# loki-javascript-client
Check out the docs here: https://sapling-data.github.io/loki-javascript-client/wiki/

# For Developers

## Releasing

When you create a release in github, an action will automatically publish that release to npmjs.

To make this work, you will need to make sure the repository secret called "NPMJS_PUBLISH_TOKEN" is updated with a working API token on npmjs.com.
This secret will need multifactor auth turned off.
