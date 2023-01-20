require('./helpers');

const http = require('http');
const urlParser = require('url');
const routes = require('./routes');

const basic_auth = require('./middlewares/basic_auth');


module.exports = http.createServer(async function(req, res) {

    // parse request
    let url = urlParser.parse(req.url, true);
    req.path = url.pathname;
    req.query = url.query;

    // middlewares
    if ( ! basic_auth.check(req, res) ) return;

    // controllers
    try {
        let controller = routes[req.path];
        if (!controller) controller = routes['_static'];
        await controller.execute(req, res);
    } catch(e) {
        console.error('Webserver error: ' + req.url);
        console.error(e);
        res.writeHead(500);
        res.end();
    }

});