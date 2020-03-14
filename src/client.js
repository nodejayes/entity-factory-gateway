const {Guid} = require('ts-tooling/src/types/guid');

class Client {
    get Id() {
        return this._id;
    }

    get MetaData() {
        return this._meta;
    }

    constructor(socket) {
        this._id = new Guid();
        this._socket = socket;
        // TODO: add a Method to set the meta Data for each socket from outside
        this._meta = {};
    }

    Send(data) {
        this._socket.send(data);
    }
}

module.exports = {Client};
