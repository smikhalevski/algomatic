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

    const pivotValue = arr[l];
    arr[l] = arr[r];

    // true if no swaps were made
    let pristine = true;

    while (true) {
      if (comparator) {
        while (x <= y && comparator(arr[x], pivotValue) < 0) {
          x++;
        }
        while (x <= y && comparator(arr[y], pivotValue) >= 0) {
          y--;
        }
      } else {
        while (x <= y && arr[x] < pivotValue) {
          x++;
        }
        while (x <= y && arr[y] >= pivotValue) {
          y--;
        }
      }
      if (x >= y) {
        break;
      }
      if (swap) {
        if (pristine) {
          // Rollback to prevent inconsistency if swap throws
          arr[l] = pivotValue;
          swap(l, r);
          arr[l] = arr[r];
          arr[r] = pivotValue;
          pristine = false;
        }
        swap(x, y);
      }
      const t = arr[x];
      arr[x] = arr[y];
      arr[y] = t;
    }

    if (swap) {
      if (r !== x) {
        if (l !== x) {
          if (pristine) {
            arr[l] = pivotValue;
            swap(l, r);
            arr[l] = arr[r];
            arr[r] = pivotValue;
          }
          swap(r, x);
        }
        arr[r] = arr[x];
      } else if (pristine) {
        arr[l] = pivotValue;
        swap(l, r);
        arr[l] = arr[r];
      }
    } else if (r !== x) {
      arr[r] = arr[x];
    }

    arr[x] = pivotValue;

    stack[i++] = l;
    stack[i++] = x - 1;
    stack[i++] = x + 1;
    stack[i++] = r;
  }

  sharedStack = stack;

  return arr;
}
