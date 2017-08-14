'use strict';

const path = require('path');

const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const dummyjson = require('dummy-json');
const {merge} = require('lodash');

const PORT = 3030;

const app = express();

app.use(compression());
app.use(morgan('dev'));
app.use('/api/simple', require('./simple'));
app.use('/api/memory', require('./memory'));

app.use(express.static(path.resolve(__dirname, '../../dist/client/')));

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Listening on ${PORT}`);
    } else {
        console.error(`Failed to start server on ${PORT}`);
        console.error(err);
    }
});
