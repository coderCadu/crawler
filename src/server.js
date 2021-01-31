
const express = require('express');

const routes = require('./routes');

const app = express();

(() => {
    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || 3000;

    app.use(express.json({'strict': true,'type': 'application/json'}));
    app.use(routes);
    app.use((request, response) => response.status(404).send({ error: 'Not Found' }));

    app.listen(port, () => console.log(`the server running on url http://${host}:${port}/`));
})();
