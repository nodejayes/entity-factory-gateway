### Serve static Files

you can serve static files when you write the path into the server options.

```javascript
const path = require('path');
const {Server} = require('../src');

// the static hosted files are in the web folder of the directory of this file
const SERVER = new Server({
    webroot: path.join(__dirname, 'web'),
    actionHandler: path.join(__dirname, 'handler'),
});
SERVER.start();
```
