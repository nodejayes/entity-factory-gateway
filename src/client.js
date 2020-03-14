const {Guid} = require('ts-tooling/src/types/guid');

class Client {
    constructor(socket) {
        this._id = new Guid();
        this._socket = socket;
        // TODO: add a Method to set the meta Data for each socket from outside
        this._meta = {};
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
