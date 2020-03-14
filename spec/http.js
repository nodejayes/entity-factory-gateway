const path = require('path');
const {Server} = require('../src');

const SERVER = new Server({
    adminKey: '12345',
    webroot: path.join(__dirname, 'web'),
    actionHandler: path.join(__dirname, 'handler'),
});
SERVER.start();
