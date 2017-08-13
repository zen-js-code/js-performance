'use strict';

const express = require('express');
const dummyjson = require('dummy-json');
const {merge} = require('lodash');

const router = new express.Router();

class User {
    constructor(data) {
        merge(this, data);
    }
}

const userSeed = `{
    "id": "{{guid}}",
    "name": "{{title}} {{firstName}} {{lastName}}",
    "address": "{{city}}, {{int 1 100}} {{street}}"
}`;

function userFactory(age) {
    const userData = JSON.parse(dummyjson.parse(`{
        "id": "{{guid}}",
        "name": "{{title}} {{firstName}} {{lastName}}",
        "age": "${age}",
        "address": "{{city}}, {{int 1 100}} {{street}}"
    }`));

    const user = new User(userData);

    return function createUser() {};
}

router.get('/inflate', (req, res) => {
    const age = Math.floor(Math.random(0, 1) * 100);
    const createUser = userFactory(age);
    const user = createUser();
    res.status(200).send({message: 'OK'});
});

module.exports = router;
