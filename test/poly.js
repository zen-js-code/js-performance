'use strict';

const {alg} = require('yargs').argv;
const {loadTest} = require('loadtest');

const OPTIONS = {
    url: 'http://localhost:3030/api/simple/poly',
    method: 'GET',
    contentType: 'application/json',
    agentKeepAlive: true,
    maxRequests: 5,
    concurrency: 1,
    requestsPerSecond: 1
};

loadTest(OPTIONS, (err, result) => {
    if (!err) {
        console.log(result);
    } else {
        console.error(err);
    }
});
