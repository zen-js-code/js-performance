'use strict';

const {alg} = require('yargs').argv;
const {loadTest} = require('loadtest');

const OPTIONS = {
    url: `http://localhost:3030/api/sort/${alg}`,
    method: 'GET',
    contentType: 'application/json',
    agentKeepAlive: true,
    maxRequests: 1,
    concurrency: 1,
    requestsPerSecond: 1
};

const start = process.hrtime();
const end = process.hrtime(start);
console.log(`Elapsed: ${end[0] * 1e3 + end[1] / 1e6}`);

loadTest(OPTIONS, (err, result) => {
    if (!err) {
        console.log(result);
    } else {
        console.error(err);
    }
});
