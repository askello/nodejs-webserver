module.exports = {

    check: function(req, res) {

        if (req.path == '/healthcheck') return true;
        if (!process.env.BASIC_AUTH_USER) return true;

        let [username, password] = this.getUserCredentials(req);

        let credentialsValid = true
            && username == process.env.BASIC_AUTH_USER
            && password == process.env.BASIC_AUTH_PASSWORD;

        if (!credentialsValid) {
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Basic realm="Admin area"');
            res.end('Access denied');
            return false;
        }

        return true;
    },

    getUserCredentials: function(req) {
        try {
            let header = req.headers.authorization;
            let username_password_hash = header.split(' ')[1];
            let username_password = Buffer.from(username_password_hash, 'base64').toString();
            return username_password.split(':');
        } catch (e) {
            return ['', ''];
        }
    }

};
