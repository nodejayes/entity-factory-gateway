const {ActionHandler} = require('./handler');
const {setupAuthentication} = require('./authentication/paths');
const fastify = require('fastify');
const helmet = require('fastify-helmet');
const staticFiles = require('fastify-static');
const fs = require('fs');
const path = require('path');

const ACTIONS = {};
const GUARDS = {};
const GUARD_KEY = '_guard';
let server = null;

function buildActionHandler(folder) {
    const entries = fs.readdirSync(folder);
    for (let i = 0; i < entries.length; i++) {
        const entry = path.join(folder, entries[i]);
        const stat = fs.statSync(entry);
        if (stat.isDirectory()) {
            buildActionHandler(entry);
            continue;
        }
        if (!entry.EndsWith('.action.js')) {
            continue;
        }
        const obj = require(entry);
        const firstLevelKeys = Object.keys(obj);
        const hasGuard = firstLevelKeys.Contains(GUARD_KEY);
        for (let j = 0; j < firstLevelKeys.length; j++) {
            const key = firstLevelKeys[j];
            const value = obj[key];
            if (value && typeof value === typeof function () {}) {
                console.info(`register action ${key}`);
                ACTIONS[key] = value;
                if (hasGuard) {
                    GUARDS[key] = obj[GUARD_KEY];
                }
            }
        }
    }
}

function initServerInstance(options) {
    setupAuthentication(options.adminKey);
    buildActionHandler(options.actionHandler);
    const hasCert = fs.existsSync(options.keyfile) && fs.existsSync(options.certfile);
    const http2 = hasCert && options.usehttp2;
    if (hasCert) {
        server = fastify({
            http2: http2,
            https: {
                key: fs.readFileSync(options.keyfile),
                cert: fs.readFileSync(options.certfile),
            }
        });
    } else {
        server = fastify();
    }
    server.register(helmet, {
        referrerPolicy: { policy: 'no-referrer' }
    });
    server.register(require('fastify-cors'));
    server.register(require('fastify-ws'));
    server.register(staticFiles, {
        root: options.webroot,
    });

    server.ready(err => {
        if (err) {
            throw err;
        }

        server.ws.on('connection', (socket, req) => {
            const actionHandler = new ActionHandler(socket, req, ACTIONS, GUARDS);
            socket.on('close', () => {
                actionHandler.destroy();
            });
        });
    });
}

class Server {
    constructor(options) {
        this._options = options;
        initServerInstance(this._options);
    }

    async start() {
        try {
            await server.listen(this._options.port || 3000, this._options.address || '0.0.0.0');
        }
        catch (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    }
}

module.exports = {Server};
