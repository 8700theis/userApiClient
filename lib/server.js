const express = require('express');
const path = require('path');

const server = {};

const expressServer = express();

// Express server middleware
expressServer.use(express.static('src'));

expressServer.get('/', (req, res) => {

    console.log(__dirname)
    res.sendFile(path.join(__dirname, '../index.html'));

});

server.run = () => {

    let port = 3002;

    expressServer.listen(port, () => {

        console.log('\x1b[32m%s\x1b[0m','Serveren benytter følgende adresse http://localhost:' + port);

    })

}


module.exports = server;

