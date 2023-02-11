module.exports = {

    execute: async function(req, res) {
        res.endJSON(200, {
            request: 'GET ' + req.url,
            data: req.query,
        });
    },

};