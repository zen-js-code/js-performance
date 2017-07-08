'use strict';

const express = require('express');
const morgan = require('morgan');
const app = express();

const PORT = 5151;

app.use(morgan('dev'));

app.get('/api/healthcheck', (req, res) => {
    res.status(200).send({status: 'OK'});
});

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Listening on ${PORT}`);
    } else {
        console.error(`Failed to start server on ${PORT}`);
        console.error(err);
    }
});
