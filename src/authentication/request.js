const jwt = require('jsonwebtoken');
const {readUserData} = require('./paths');

module.exports.requestToken = function (context, payload) {
    const data = readUserData(payload.user, payload.password);
    if (!data) {
        context.sendCaller('receiveToken', '');
        return;
    }
    try {
        const token = jwt.sign({
            exp:  Math.floor(Date.now() / 1000) + (60 * 60),
            data: data,
        }, 'asdadsadsadsadsdsdsadasdsadsads');
        context.sendCaller('receiveToken', token);
    } catch (err) {
        console.warn(`Error on sign JWT ${err.message}`);
    }
};
