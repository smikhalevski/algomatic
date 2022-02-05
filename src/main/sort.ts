import {MutableArrayLike} from './shared-types';

let sharedStack: Int32Array | undefined;

/**
 * Non-recursive quicksort algorithm implementation aimed for sorting multiple arrays in parallel.
 *
 * @param arr The mutable array that is sorted in-place.
 * @param swap The callback that is invoked with indices that were swapped.
 * @param comparator The callback that defines the sort order. If omitted, the array elements are compared using
 *     comparison operators.
 */
export function sort<T>(arr: MutableArrayLike<T>, swap?: (i: number, j: number) => void, comparator?: (a: T, b: T) => number) {
  const n = arr.length;

  if (n < 2) {
    return arr;
  }
  if (n === 2) {
    const a0 = arr[0];
    const a1 = arr[1];

    if (comparator ? comparator(a0, a1) > 0 : a0 > a1) {
      arr[0] = a1;
      arr[1] = a0;
      swap?.(0, 1);
    }
    return arr;
  }

  let i = 2;

  const stack = sharedStack || new Int32Array(256);

  sharedStack = undefined;

  stack[0] = 0;
  stack[1] = n - 1;

  while (i > 1) {
    let r = stack[--i];
    let l = stack[--i];

    if (l >= r) {
      continue;
    }

    let x = l;
    let y = r - 1;

    const pivot = l;
    const pivotValue = arr[pivot];
    arr[pivot] = arr[r];
    swap?.(l, r);

    if (comparator) {
      while (true) {
        while (x <= y && comparator(arr[x], pivotValue) < 0) {
          x++;
        }
        while (x <= y && comparator(arr[y], pivotValue) >= 0) {
          y--;
        }
        if (x > y) {
          break;
        }
        const t = arr[x];
        arr[x] = arr[y];
        arr[y] = t;
        swap?.(x, y);
      }
    } else {
      while (true) {
        while (x <= y && arr[x] < pivotValue) {
          x++;
        }
        while (x <= y && arr[y] >= pivotValue) {
          y--;
        }
        if (x > y) {
          break;
        }
        const t = arr[x];
        arr[x] = arr[y];
        arr[y] = t;
        swap?.(x, y);
      }
    }

    arr[r] = arr[x];
    arr[x] = pivotValue;
    swap?.(r, x);

    stack[i++] = l;
    stack[i++] = x - 1;
    stack[i++] = x + 1;
    stack[i++] = r;
  }

  sharedStack = stack;

  return arr;
}
