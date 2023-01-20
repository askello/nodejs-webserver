module.exports = {

    execute: async function(req, res) {
        let requestData = await req.readJSON();
        res.endJSON(200, requestData);
    },

};