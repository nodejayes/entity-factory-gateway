const {Client} = require('./client');
const {requestToken} = require('./authentication/request');

class ActionHandler {
    constructor(socket, req, actions, guards) {
        this._client = new Client(socket, req);
        socket.on('message', data => {
            const msg = this._unpackMessage(data);
            if (msg.type === 'requestToken') {
                requestToken(this, msg.payload);
                return;
            }
            const action = actions[msg.type];
            const guard = guards[msg.type];
            if (!action || typeof action !== typeof function () {}) {
                return;
            }
            if (!guard || guard(this, msg.payload) === true) {
                action(this, msg.payload);
            }
        });
        ActionHandler.clients.Add(this._client);
    }

    get meta() {
        return this._client.metaData;
    }

    destroy() {
        ActionHandler.clients.Remove(this._client);
        this._client = null;
    }

    sendCaller(type, payload) {
        const msg = this._packMessage({
            type: type,
            payload: payload,
        });
        this._client.send(msg);
    }

    send(type, payload, filter) {
        const pack = this._packMessage({
            type: type,
            payload: payload,
        });
        for (const client of ActionHandler.clients.FindAll(filter)) {
            client.send(pack);
        }
    }

    _packMessage(msg) {
        return JSON.stringify(msg);
    }

    _unpackMessage(data) {
        return JSON.parse(data);
    }
}

ActionHandler.clients = [];

module.exports = {ActionHandler};
