import {MutableArrayLike} from './shared-types';

/**
 * Non-recursive quicksort algorithm implementation aimed for sorting multiple arrays in parallel.
 *
 * @param arr The mutable array that is sorted in-place.
 * @param swap The callback that is invoked with indices that were swapped.
 * @param comparator The callback that defines the sort order. If omitted, the array elements are compared using
 *     comparison operators.
 */
export function parallelSort<T>(arr: MutableArrayLike<T>, swap: (i: number, j: number) => void, comparator?: (a: T, b: T) => number): void {
  const n = arr.length;
  const stack = new Uint32Array(Math.min(n, 256)); // Max 1 KB

  stack[0] = 0;
  stack[1] = n - 1;

  let i = 2; // Stack index

  while (i > 1) {

    let r = stack[--i];
    let l = stack[--i];

    if (l >= r) {
      break;
    }

    let x = l;
    let y = r - 1;

    const pivot = arr[l];
    arr[l] = arr[r];
    swap(l, r);

    if (comparator) {
      while (true) {
        while (x <= y && comparator(arr[x], pivot) < 0) {
          x++;
        }
        while (x <= y && comparator(arr[y], pivot) >= 0) {
          y--;
        }
        if (x > y) {
          break;
        }
        const t = arr[x];
        arr[x] = arr[y];
        arr[y] = t;
        swap(x, y);
      }
    } else {
      while (true) {
        while (x <= y && arr[x] < pivot) {
          x++;
        }
        while (x <= y && arr[y] >= pivot) {
          y--;
        }
        if (x > y) {
          break;
        }
        const t = arr[x];
        arr[x] = arr[y];
        arr[y] = t;
        swap(x, y);
      }
    }

    arr[r] = arr[x];
    arr[x] = pivot;
    swap(r, x);

    stack[i++] = l;
    stack[i++] = x - 1;
    stack[i++] = x + 1;
    stack[i++] = r;
  }
}
