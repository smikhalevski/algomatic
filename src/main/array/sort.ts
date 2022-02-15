import {ArrayElement, Comparator, MutableArrayLike} from '../shared-types';

// The stack is an array indices of partitions used by quicksort
let sharedStack: Uint32Array | undefined;

/**
 * Sorts the array in-place using an optional comparator and invokes a callback after a pair of elements was swapped.
 *
 * `swap` or `comparator` callbacks are guaranteed to be called after the elements of `arr` are swapped.
 *
 * @param arr The mutable array-like data structure that is sorted in-place.
 * @param swap The callback that is invoked with indices that were swapped.
 * @param comparator The callback that defines the sort order. If omitted, the array elements are compared using
 *     comparison operators.
 * @returns The `arr` array.
 */
export function sort<T extends MutableArrayLike<any>>(arr: T, swap?: (i: number, j: number) => void, comparator?: Comparator<ArrayElement<T>>): T {
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
  const stack = sharedStack || new Uint32Array(256);
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

    // true if no swaps were made during the loop
    let pristine = true;

    while (true) {

      if (comparator) {
        while (x <= y && !(comparator(ax, pivotValue) >= 0)) {
          ax = arr[++x];
        }
        while (x < y && comparator(ay, pivotValue) >= 0) {
          ay = arr[--y];
        }
      } else {
        while (x <= y && !(ax >= pivotValue)) {
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

    stack[i++] = x + 1;
    stack[i++] = r;

    if (x !== l) {
      if (pristine) {
        arr[l] = ar;
        arr[r] = pivotValue;
        swap?.(l, r);
      }
      if (x !== r) {
        arr[r] = ax;
        arr[x] = pivotValue;
        swap?.(x, r);
      }

      // Smaller partition is sorted first to ensure log(n) stack depth
      if (x - l > r - x) {
        stack[i - 2] = l;
        stack[i - 1] = x - 1;

        stack[i++] = x + 1;
        stack[i++] = r;
      } else {
        stack[i++] = l;
        stack[i++] = x - 1;
      }
    }
  }

  sharedStack = stack;

  return arr;
}
