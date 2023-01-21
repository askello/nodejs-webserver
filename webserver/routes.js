module.exports = {

    // serve static content (from /public directory)
    '_static': require('./controllers/static'),

    '/healthcheck': require('./controllers/healthcheck'),

    '/demo/download-file': require('./controllers/demo/download-file'),
    '/demo/post-json': require('./controllers/demo/post-json'),
    '/demo/query-params': require('./controllers/demo/query-params'),

};
