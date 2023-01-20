module.exports = {

    execute: async function(req, res) {
        res.endJSON(200, req.query);
    },

};