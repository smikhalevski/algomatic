import {MutableArrayLike} from './shared-types';

export function qsort<T extends MutableArrayLike<any>>(values: T): T {
  let l = 0;
  let r = values.length - 1;

  let i = 2; // Stack index
  let stack = [l, r]; // Stack

  while (i > 0) {
    r = stack[--i];
    l = stack[--i];

    if (l < r) {
      // Partition

      let x = l; // Partition low
      let y = r - 1; // Partition high

      const value = values[l];
      values[l] = values[r];

      while (true) {
        while (x <= y && values[x] < value) {
          x++;
        }
        while (x <= y && values[y] >= value) {
          y--;
        }
        if (x > y) {
          break;
        }
        const t = values[x];
        values[x] = values[y];
        values[y] = t;
      }

      values[r] = values[x];
      values[x] = value;

      // End

      stack[i++] = l;
      stack[i++] = x - 1;
      stack[i++] = x + 1;
      stack[i++] = r;
    }
  }

  return values;
}
