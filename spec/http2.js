const path = require('path');
const {Server} = require('../src');

const SERVER = new Server({
    webroot: path.join(__dirname, 'web'),
    actionHandler: path.join(__dirname, 'handler'),
    keyfile: path.join(__dirname, 'key.pem'),
    certfile: path.join(__dirname, 'cert.pem'),
    usehttp2: true,
});
SERVER.start();
