module.exports._guard = function (context, payload) {
    console.info('hello guard triggerd: ', context.meta);
    return true;
};
module.exports.hello = function (context, payload) {
    context.sendCaller('world', `Hello ${payload}`);
};
