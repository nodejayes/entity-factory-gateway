### ConnectionContext

the Connection Context contains the current connected client and the other connected clients including the metadata It is possible to send to the calling client or to use a filter function to find clients to which you can send back.

##### Send back to the Caller

```javascript
module.exports.hello = function (context, payload) {
    context.sendCaller('world', `Hello ${payload}`);
};
```

##### Send back to multiple Connections

```javascript
module.exports.hello = function (context, payload) {
    // sends only to the Clients with userId between 2 and 10
    context.send('world', `Hello ${payload}`, (client) => client.meta.userId > 2 && client.meta.userId < 10);
};
```
