'use strict';

const path = require('path');

const express = require('express');
const morgan = require('morgan');
const dummyjson = require('dummy-json');

const PORT = 3030;

const app = express();
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

const arrayseed = '[{{#repeat 10000}}{{int 0 1000}},"{{int 0 1000}}"{{/repeat}}]';

function compare(a, b) {
    return a > b;
}

function max(array) {
    let max = array[0];

    for (let i = 1; i < array.length; i++) {
        if (compare(array[i], max)) {
            max = array[i];
        }
    }

    return max;
}

router.get('/poly', (req, res) => {
    const array = JSON.parse(dummyjson.parse(arrayseed));
    const maxValue = max(array);
    res.status(200).send({max: maxValue});
});

app.use(morgan('dev'));
app.use('/api', router);

app.use(express.static(path.resolve(__dirname, '../../dist/client/')));

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Listening on ${PORT}`);
    } else {
        console.error(`Failed to start server on ${PORT}`);
        console.error(err);
    }
});
