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
