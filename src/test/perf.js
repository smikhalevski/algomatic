const {test} = require('@smikhalevski/perf-test');
const chalk = require('chalk');
const {sort} = require('../../lib/index-cjs.js');

const arr = [];

function shuffle() {
  for (let i = 0; i < 10_000; ++i) {
    arr[i] = Math.random();
  }
}

console.log(chalk.inverse(' Sort '));
gc();
test('Array.sort', () => arr.sort(), {timeout: 10_000, targetRme: 0.002, beforeCycle: shuffle});
gc();
test('sort      ', () => sort(arr), {timeout: 10_000, targetRme: 0.002, beforeCycle: shuffle});
