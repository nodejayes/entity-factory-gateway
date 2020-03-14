const {EntityFactoryEndpoint} = require('entity-factory-connector');

const ACTIONS = {
    world: (payload) => {
        alert(payload);
        if (!ENDPOINT.isAuthenticated) {
            ENDPOINT.authenticate('admin', '12345');
            setTimeout(() => {
                alert(ENDPOINT.hasRights('and', ['createUser', 'deleteUser', 'createRight', 'deleteRight', 'createGroup', 'deleteGroup']));
                ENDPOINT.send('hello', 'Admin');
            }, 1000);
        }
    }
};

const ENDPOINT = new EntityFactoryEndpoint('test-entity-factory-gateway-token');
ENDPOINT.register(ACTIONS);
ENDPOINT.connect();

ENDPOINT.send('hello', 'Markus');
