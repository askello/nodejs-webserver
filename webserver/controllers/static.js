const fs = require('fs/promises');
const path = require('path');

module.exports = {

    mimeTypes: {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.ico': 'image/x-icon',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
    },

    execute: async function(req, res) {
        let filePath = __dirname + '/../public' + req.path;

        if (filePath.endsWith('/')) {
            filePath += 'index.html';
        }

        filePath = path.resolve(filePath);

        try {
            let content = await fs.readFile(filePath);
            res.writeHead(200, { 'Content-Type': this.getContentType(filePath) });
            res.end(content, 'utf-8');
        } catch (e) {
            res.writeHead(404);
            res.end();
        }
    },

    getContentType: function(filePath) {
        let extname = String(path.extname(filePath)).toLowerCase();
        return this.mimeTypes[extname] || 'application/octet-stream';
    },

}