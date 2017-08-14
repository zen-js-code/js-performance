'use strict';

const express = require('express');
const dummyjson = require('dummy-json');
const {merge} = require('lodash');
const router = new express.Router();

function insertionSort(array) {
    for (let i = 0; i < array.length; i++) {
        const temp = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > temp) {
            array[j + 1] = array[j];
            j--;
        }

        array[j + 1] = temp;
    }

    return array;
}


function selectionSort(array) {
    const ret = Array.from(array);
    let minIndex;

    for (let i = 0; i < ret.length; ++i) {
        minIndex= i;
        for (let j = i; j < ret.length; ++j) {
            if (ret[j] < ret[minIndex]) {
                minIndex= j;
            }
        }
        [ret[i], ret[minIndex]] = [ret[minIndex], ret[i]];
    }
    return ret;
}

function nativeSort(array) {
    return array.sort();
}

const iterations = 50;
const multiplier = 1000000000;

function calculatePrimes(iterations, multiplier) {
    const primes = [];

    for (let i = 0; i < iterations; i++) {
        const candidate = i * (multiplier * Math.random());
        let isPrime = true;

        for (let c = 2; c <= Math.sqrt(candidate); ++c) {
            if (candidate % c === 0) {
                // not prime
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(candidate);
        }
    }
    return primes;
}

router.get('/primes', (req, res) => {
    const primes = calculatePrimes(iterations, multiplier);
    res.status(200).send({primes});
});

const seed = '[{{#repeat 10000}}"{{firstName}}{{lastName}}"{{/repeat}}]';

router.get('/sort/insertion', (req, res) => {
    const array = JSON.parse(dummyjson.parse(seed));
    const sortedArray = insertionSort(array);
    res.status(200).send(sortedArray);
});

router.get('/sort/selection', (req, res) => {
    const array = JSON.parse(dummyjson.parse(seed));
    const sortedArray = selectionSort(array);
    res.status(200).send(sortedArray);
});

router.get('/sort/native', (req, res) => {
    const array = JSON.parse(dummyjson.parse(seed));
    const sortedArray = nativeSort(array);
    res.status(200).send(sortedArray);
});

const userSeed = `{
    "users": [
    {{#repeat 100}}
        {
          "id": {{@index}},
          "name": "{{firstName}} {{lastName}}",
          "work": "{{company}}",
          "email": "{{email}}",
          "dob": "{{date '1900' '2000' 'YYYY'}}",
          "address": "{{int 1 100}} {{street}}",
          "city": "{{city}}"
        }
    {{/repeat}}
    ]
}`;

router.get('/merge', (req, res) => {
    const object1 = JSON.parse(dummyjson.parse(userSeed));
    const object2 = JSON.parse(dummyjson.parse(userSeed));
    const merged = merge({}, object1, object2);
    res.status(200).send({merged});
});

const crypto = require('crypto');

function createHash(password) {
    const salt = crypto.randomBytes(512).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1e5, 512, 'sha512');
    return hash;
}

router.get('/crypto', (req, res) => {
    const password = dummyjson.parse('{{guid}}');
    const hash = createHash(password);
    res.status(200).send({hash});
});

module.exports = router;
