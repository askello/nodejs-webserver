
// set env variables
process.env.PORT = 8080;
process.env.BASIC_AUTH_USER = 'admin';
process.env.BASIC_AUTH_PASSWORD = 'admin';

// start webserver
const server = require('./webserver/server');
server.listen(process.env.port, () => {
    console.log(`Server is running on http://127.0.0.1:${process.env.PORT}/`);
});