const {Guid} = require('ts-tooling/src/types/guid');
const {verify} = require('./authentication/verify');

class Client {
    constructor(socket, req) {
        this._id = new Guid();
        this._socket = socket;
        this._meta = {};
        let token = null;
        const params = req.url.Split('?')[1];
        if (params) {
            const values = params.Split('=');
            const tokenIdx = values.IndexOf('token');
            if (tokenIdx > -1 && (tokenIdx+1) <= (values.length-1)) {
                token = values[tokenIdx+1];
            }
        }
        if (token) {
            try {
                this._meta.user = verify(token).data;
                this.send(JSON.stringify({type:'myRights',payload:this._meta.user.groups}))
            } catch (err) {
                this.send(JSON.stringify({type:'invalidToken'}));
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
