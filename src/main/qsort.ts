import { ArrayValue, Comparator, MutableArrayLike } from './types';

// The stack is an array indices of partitions used by quicksort
let globalStack: number[] | null = [];

/**
 * Sorts the array in-place using an optional comparator and invokes a callback after a pair of elements was swapped.
 *
 * `swap` or `comparator` callbacks are guaranteed to be called after the elements of `arr` are swapped.
 *
 * @param arr The mutable array-like data structure that is sorted in-place.
 * @param swap The callback that is invoked with indices that were swapped.
 * @param comparator The callback that defines the sort order. If omitted, the array elements are compared using
 * comparison operators.
 * @returns The input array.
 * @template T The input array.
 * @group Sort
 */
export function qsort<T extends MutableArrayLike<any>>(
  arr: T,
  swap?: (i: number, j: number) => void,
  comparator?: Comparator<ArrayValue<T>>
): T {
  let i, t, r, l, x, y, pivotValue, ar, ax, ay, pristine;

  const n = arr.length;

  const compares = comparator != null;
  const swaps = swap != null;

  if (n < 2) {
    return arr;
  }

  if (n === 2) {
    ax = arr[0];
    ay = arr[1];

    if (compares ? comparator(ax, ay) > 0 : ax > ay) {
      arr[0] = ay;
      arr[1] = ax;

      if (swaps) {
        swap(0, 1);
      }
    }
    return arr;
  }

  // Nested sort call creates a new stack, otherwise previously allocated stack is reused
  const stack = globalStack || [];
  globalStack = null;

  stack[0] = 0;
  stack[1] = n - 1;

  i = 2;

  while (i > 1) {
    r = stack[--i];
    l = stack[--i];

    if (l >= r) {
      continue;
    }

    x = l;
    y = r - 1;

    pivotValue = arr[x];

    ar = arr[r];

    ax = ar;
    ay = arr[y];

    // true if no swaps were made during the loop
    pristine = true;

    while (true) {
      if (compares) {
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

        if (swaps) {
          swap(l, r);
        }
      }

      t = ax;
      ax = arr[x] = ay;
      ay = arr[y] = t;

      if (swaps) {
        swap(x, y);
      }
    }

    stack[i++] = x + 1;
    stack[i++] = r;

    if (x !== l) {
      if (pristine) {
        arr[l] = ar;
        arr[r] = pivotValue;

        if (swaps) {
          swap(l, r);
        }
      }

      if (x !== r) {
        arr[r] = ax;
        arr[x] = pivotValue;

        if (swaps) {
          swap(x, r);
        }
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

  globalStack = stack;

  return arr;
}
