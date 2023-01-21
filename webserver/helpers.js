const http = require('http');
const fs = require('fs');
const path = require("path");

http.ServerResponse.prototype.endJSON = function (statusCode, jsonStr) {
    if (typeof jsonStr != 'string') {
        jsonStr = JSON.stringify(jsonStr);
    }

    this.endFile(statusCode, {
        content: jsonStr,
        contentType: 'application/json; charset=utf-8',
    });
};

http.ServerResponse.prototype.endLocalFile = async function(filePath) {
    let stat = await fs.promises.stat(filePath);
    this.sendDate = false;
    this.writeHead(200, {
        'Content-Type': getContentType(filePath),
        'Content-Length': stat.size,
    });
    fs.createReadStream(filePath).pipe(this);
};

http.ServerResponse.prototype.endFile = function(statusCode, fileInfo) {
    this.sendDate = false;
    this.statusCode = statusCode;
    this.setHeader('Content-Type', fileInfo.contentType || 'application/octet-stream');
    this.setHeader('Content-Length', Buffer.byteLength(fileInfo.content, 'utf8'));
    if (fileInfo.fileName) {
        this.setHeader('Content-Disposition', 'attachment; filename="'+fileInfo.fileName+'"');
    }
    this.write(fileInfo.content);
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

function getContentType(filePath) {
    let mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.ico': 'image/x-icon',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mp4',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
    };

    let extname = String(path.extname(filePath)).toLowerCase();
    return mimeTypes[extname] || 'application/octet-stream';
}