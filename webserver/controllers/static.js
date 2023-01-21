const path = require('path');

module.exports = {

    execute: async function(req, res) {
        let filePath = __dirname + '/../public' + req.path;

        if (filePath.endsWith('/')) {
            filePath += 'index.html';
        }

        filePath = path.resolve(filePath);

        try {
            await res.endLocalFile(filePath);
        } catch (e) {
            res.writeHead(404);
            res.end();
        }
    },

}