module.exports._guard = function (context, payload) {
    console.info('hello guard triggerd');
    return true;
};
module.exports.hello = function (context, payload) {
    context.SendCaller('world', `Hello ${payload}`);
};
