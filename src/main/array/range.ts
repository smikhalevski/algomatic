import {Easing, MutableArrayLike} from '../shared-types';

/**
 * Creates an array of length `n` and fills it with numbers in range [`a`, `b`].
 *
 * @param n The array length.
 * @param a The minimum value or 0 if omitted.
 * @param b The maximum value or 1 if omitted.
 * @param easing The easing function that receives `t` ∈ [0, 1] and return a mapped value.
 * @returns The array of numbers.
 */
export function range(n: number, a?: number, b?: number, easing?: Easing): number[];

/**
 * Populates first `n` elements of an array with numbers in range [`a`, `b`].
 *
 * @param arr The array to populate.
 * @param n The array length.
 * @param a The minimum value.
 * @param b The maximum value.
 * @param easing The easing function that receives `t` ∈ [0, 1] and return a mapped value.
 * @returns The array of numbers.
 */
export function range<T extends MutableArrayLike<number>>(arr: T, n: number, a?: number, b?: number, easing?: Easing): T;

export function range() {
  let i = 0;

  const args = arguments;
  const arr = typeof args[0] === 'number' ? [] : args[i++];
  const n = args[i++];

  let a = args[i++];
  let b = args[i++];

  a ??= 0;
  b ??= 1;

  if (n === 0) {
    return arr;
  }
  if (n === 1) {
    arr[0] = a;
    return arr;
  }

  const easing = args[i++];

  if (easing) {
    for (let j = 0; j < n; ++j) {
      arr[j] = a + easing(j / (n - 1)) * (b - a);
    }
  } else {
    for (let j = 0; j < n; ++j) {
      arr[j] = a + j / (n - 1) * (b - a);
    }
  }
  return arr;
}
