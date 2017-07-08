'use strict';

const express = require('express');
const morgan = require('morgan');
const app = express();

const dummyjson = require('dummy-json');

const PORT = 5151;
const leak = [];

class UsersWithLeak {
    constructor() {
        this.users = JSON.parse(dummyjson.parse(`{
            {{#repeat 10}}
                "id": {{int 1000 9999}},
                "name": "{{title}} {{firstName}} {{lastName}}",
                "work": "{{company}}",
                "email": "{{email}}",
                "dateOfBirth": "{{date 1950 1990 'mediumDate'}}"
            {{/repeat}}
        }`));
    }
}

function createUsers() {
    const usersWithLeak = new UsersWithLeak();
    leak.push(usersWithLeak);
    return usersWithLeak.users;
}

app.use(morgan('dev'));

app.get('/api/healthcheck', (req, res) => {
    res.status(200).send({status: 'OK'});
});

app.get('/api/users', (req, res) => {
    res.status(200).send(createUsers());
})

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Listening on ${PORT}`);
    } else {
        console.error(`Failed to start server on ${PORT}`);
        console.error(err);
    }
});
