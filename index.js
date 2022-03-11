const server = require('./lib/server.js')
const app = {};

app.init = () => {

    console.log('init');
    server.run();
}

app.init();

module.exports = app;
