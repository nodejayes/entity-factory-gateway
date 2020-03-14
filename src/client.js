const {Guid} = require('ts-tooling/src/types/guid');
const {verify} = require('./authentication/verify');

class Client {
    constructor(socket, req) {
        this._id = new Guid();
        this._socket = socket;
        this._meta = {};
        const token = req.headers['entity-factory-token'];
        if (token) {
            try {
                this._meta.user = verify(token);
            } catch (err) {
                console.warn(`Error on verify token ${token}: ${err.message}`);
            }
        }
    }

    get id() {
        return this._id;
    }

    get metaData() {
        return this._meta;
    }

    send(data) {
        this._socket.send(data);
    }
}

module.exports = {Client};
