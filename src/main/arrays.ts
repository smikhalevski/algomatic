import {MutableArrayLike} from './shared-types';

/**
 * Swaps `i` and `j` elements of the array `arr`.
 */
export function swap(arr: MutableArrayLike<unknown>, i: number, j: number): void {
  const t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
}

/**
 * Returns -1 if `a` < `b`, 1 if `a` > `b` and 0 otherwise.
 */
export function asc<T>(a: T, b: T): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * Returns 1 if `a` < `b`, -1 if `a` > `b` and 0 otherwise.
 */
export function desc<T>(a: T, b: T): number {
  return a < b ? 1 : a > b ? -1 : 0;
}

/**
 * Creates an array of length `n` and fills it with numbers in range [`a`, `b`].
 *
 * @param n The array length.
 * @param a The minimum value or 0 if omitted.
 * @param b The maximum value or 1 if omitted.
 * @returns The array of numbers.
 */
export function range(n: number, a?: number, b?: number): number[];

/**
 * Populates first `n` elements of an array with numbers in range [`a`, `b`].
 *
 * @param n The array length.
 * @param a The minimum value.
 * @param b The maximum value.
 * @param arr The array to populate.
 * @returns The array of numbers.
 */
export function range<T extends MutableArrayLike<number>>(n: number, a: number, b: number, arr: T): T;

export function range(n: number, a = 0, b = 1, arr?: MutableArrayLike<number>) {
  arr ||= [];
  if (n === 1) {
    arr[0] = a;
  } else {
    for (let i = 0; i < n; ++i) {
      arr[i] = a + i / (n - 1) * (b - a);
    }
  }
  return arr;
}
