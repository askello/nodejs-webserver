module.exports = {

    execute: async function(req, res) {
        res.endJSON(200, {
            request: 'POST ' + req.url,
            data: await req.readJSON(),
        });
    },

};