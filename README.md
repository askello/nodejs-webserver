# nodejs-webserver

Battle-tested web server which:
1. Serves static content (from `webserver/public` directory)
2. Executes custom functions (controllers) on defined routes
3. Is protected by username/password (BasicAuth)

Why this server is good:
1. Zero dependencies (only native nodejs code)
2. Easy to understand (there is very little code inside)
3. Written in asynchronous way (by-by callback-hell)

## Try / Demo

To try it out, check variables inside of `index.js` file and then run:
```shell
node index.js
```