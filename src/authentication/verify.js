const jwt = require('jsonwebtoken');

module.exports.verify = function (token) {
    return jwt.verify(token, 'asdadsadsadsadsdsdsadasdsadsads');
};
