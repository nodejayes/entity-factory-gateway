### Action Handler

the Action Handler is a file that exports a Function on the Action type.

```javascript
// for this example the action is {type: 'hello', payload: 'some string'}
module.exports.hello = function (context, payload) {
    context.sendCaller('world', `Hello ${payload}`);
};
```

it is possible to export multiple actions in one action handler file but all these handlers can have only one guard.

for mode Details about the Action Handler Guards look [here](action-handler-guards.md)
