### Action Handler Guards

Action Handler Guards are functions that are executed before the actual handler function and must always return a Boolean value. The return value determines whether the handler function may be executed or not.

Um einen Action Handler Guard zu definieren, muss die Funktion in der jeweiligen Action Handler Datei exportiert werden als "_guard".

```javascript
module.exports._guard = function (context, payload) {
    console.info('hello guard triggerd');
    return true;
};
module.exports.hello = function (context, payload) {
    context.sendCaller('world', `Hello ${payload}`);
};
```

The respective ConnectionContext and the payload of the action is transferred to the Action Handler Guard.

for more Details about the Connection Context look [here](connection-context.md) 
