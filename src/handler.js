const {Client} = require('./client');

class ActionHandler {
    constructor(socket, actions, guards) {
        this._client = new Client(socket);
        socket.on('message', data => {
            const msg = this._unpackMessage(data);
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

    get Meta() {
        return this._client.MetaData;
    }

    Destroy() {
        ActionHandler.clients.Remove(this._client);
        this._client = null;
    }

    SendCaller(type, payload) {
        const msg = this._packMessage({
            type: type,
            payload: payload,
        });
        this._client.Send(msg);
    }

    Send(type, payload, filter) {
        const pack = this._packMessage({
            type: type,
            payload: payload,
        });
        for (const client of ActionHandler.clients.FindAll(filter)) {
            client.Send(pack);
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
