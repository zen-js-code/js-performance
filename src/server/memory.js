'use strict';

const express = require('express');
const dummyjson = require('dummy-json');
const {merge} = require('lodash');

const router = new express.Router();

class LeakyUser {
    constructor(data) {
        merge(this, data);
    }
}

let user;

function createUser(age) {
    const userData = JSON.parse(dummyjson.parse(`{
        "id": "{{guid}}",
        "name": "{{title}} {{firstName}} {{lastName}}",
        "age": "${age}",
        "address": "{{city}}, {{int 1 100}} {{street}}"
    }`));

    user = new LeakyUser(userData);
}

router.get('/inflate', (req, res) => {
    createUser(Math.floor(Math.random(0, 1) * 100));
    res.status(200).send({user});
});

module.exports = router;
