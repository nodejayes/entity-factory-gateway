const {EntityFactoryEndpoint} = require('entity-factory-connector');

const ACTIONS = {
    world: (payload) => {
        alert(payload);
    }
};

const ENDPOINT = new EntityFactoryEndpoint();
ENDPOINT.register(ACTIONS);
ENDPOINT.connect();

setTimeout(() => {
    ENDPOINT.send('hello', 'Markus');
}, 1000);
