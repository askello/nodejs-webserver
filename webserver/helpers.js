const http = require('http');

http.ServerResponse.prototype.endJSON = function (statusCode, jsonStr) {
    if (typeof jsonStr != 'string') {
        jsonStr = JSON.stringify(jsonStr);
    }

    this.sendDate = false;
    this.statusCode = statusCode;
    this.setHeader('Content-Type', 'application/json; charset=utf-8');
    this.setHeader('Content-Length', Buffer.byteLength(jsonStr, 'utf8'));
    this.write(jsonStr);
    this.end();
};

http.ServerResponse.prototype.redirect = function (statusCode, Location) {
    this.writeHead(statusCode, {Location});
    this.end();
};

http.IncomingMessage.prototype.readBody = function () {
    let msg = this;

    return new Promise((resolve, reject) => {
        let buffers = [];

        msg.on('data', function (buffer) {
            buffers.push(buffer);
        });

        msg.on('end', function () {
            resolve(Buffer.concat(buffers).toString());
        });
    });
};

http.IncomingMessage.prototype.readJSON = async function () {
    return JSON.parse(await this.readBody());
};