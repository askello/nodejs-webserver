module.exports = {

    execute: async function(req, res) {
        res.endFile(200, {
            content: req.query.content,
            contentType: 'text/plain',
            fileName: req.query.filename,
        });
    },

};