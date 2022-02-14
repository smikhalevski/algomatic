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
export function sort<T, A extends MutableArrayLike<T> = MutableArrayLike<T>>(arr: A, swap?: (i: number, j: number) => void, comparator?: (a: T, b: T) => number): A {
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

  // Nested sort call creates a new stack, otherwise previously allocated stack is reused
  const stack = sharedStack || new Int32Array(256); // 1 KB
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

    const pivotValue = arr[x];

    const ar = arr[r];

    let ax = ar;
    let ay = arr[y];

    // true if no swaps were made during loop
    let pristine = true;

    while (true) {

      if (comparator) {
        while (x <= y && comparator(ax, pivotValue) < 0) {
          ax = arr[++x];
        }
        while (x < y && comparator(ay, pivotValue) >= 0) {
          ay = arr[--y];
        }
      } else {
        while (x <= y && ax < pivotValue) {
          ax = arr[++x];
        }
        while (x < y && ay >= pivotValue) {
          ay = arr[--y];
        }
      }

      if (x >= y) {
        break;
      }

      if (pristine) {
        pristine = false;
        arr[l] = ar;
        arr[r] = pivotValue;
        swap?.(l, r);
      }

      const t = ax;
      ax = arr[x] = ay;
      ay = arr[y] = t;
      swap?.(x, y);
    }

    if (pristine) {
      arr[l] = ar;
      arr[r] = pivotValue;

      if (x !== l) {
        swap?.(l, r);
      }
    }

    if (x !== r) {
      arr[r] = ax;
      arr[x] = pivotValue;

      if (x !== l) {
        swap?.(x, r);
      }
    }

    stack[i++] = l;
    stack[i++] = x - 1;
    stack[i++] = x + 1;
    stack[i++] = r;
  }

  sharedStack = stack;

  return arr;
}
