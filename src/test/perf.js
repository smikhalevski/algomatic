const {test} = require('@smikhalevski/perf-test');
const chalk = require('chalk');
const {sort} = require('../../lib/index-cjs.js');

const arr0 = [];
const arr1 = [];
for (let i = 0; i < 6; ++i) {
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

console.log(chalk.inverse(' Sort '));
gc();
test('Array.sort ', () => arr.sort(), {timeout: 10_000, targetRme: 0.002, beforeCycle: copyArr});
gc();
test('sort       ', () => sort(arr), {timeout: 10_000, targetRme: 0.002, beforeCycle: copyArr});
gc();
test('sort + swap', () => sort(arr, swap), {timeout: 10_000, targetRme: 0.002, beforeCycle: copyArr});

console.log('\n' + chalk.inverse(' Sort with comparator '));
gc();
test('Array.sort ', () => arr.sort(comparator), {timeout: 10_000, targetRme: 0.002, beforeCycle: copyArr});
gc();
test('sort       ', () => sort(arr, undefined, comparator), {timeout: 10_000, targetRme: 0.002, beforeCycle: copyArr});
gc();
test('sort + swap', () => sort(arr, swap, comparator), {timeout: 10_000, targetRme: 0.002, beforeCycle: copyArr});
