const {sort} = require('../../lib/index-cjs.js');

const arr0 = [];
const arr1 = [];
for (let i = 0; i < 10_000; ++i) {
  arr0.push(Math.random());
  arr1.push(Math.random());
}

const arr = [];

function copyArr() {
  for (let i = 0; i < arr0.length; ++i) {
    arr[i] = arr0[i];
  }
}

function comparator(a, b) {
  return a - b;
}

function swap(i, j) {
  const v = arr1[i];
  arr1[i] = arr1[j];
  arr1[j] = v;
}

describe('Sort', () => {

  beforeIteration(copyArr);

  describe('with comparator', () => {

    test('Array.sort', (measure) => {
      measure(() => arr.sort());
    });

    test('sort', (measure) => {
      measure(() => sort(arr));

    });

    test('sort + swap', (measure) => {
      measure(() => sort(arr, swap));
    });

  });

  describe('without comparator', () => {

    test('Array.sort', (measure) => {
      measure(() => arr.sort(comparator));
    });

    test('sort', (measure) => {
      measure(() => sort(arr, undefined, comparator));
    });

    test('sort + swap', (measure) => {
      measure(() => sort(arr, swap, comparator));
    });

  });

}, {targetRme: 0.002});
