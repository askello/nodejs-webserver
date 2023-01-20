module.exports = {

    // serve static content (from /public directory)
    '_static': require('./controllers/static'),

    '/healthcheck': require('./controllers/healthcheck'),

    '/demo/post-json': require('./controllers/demo/post-json'),
    '/demo/query-params': require('./controllers/demo/query-params'),

};
