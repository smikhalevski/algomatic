import { Mapper } from './types';

/**
 * Creates an array of length `n` and fills it with numbers in range [`a`, `b`].
 *
 * @param n The array length.
 * @param a The minimum value.
 * @param b The maximum value.
 * @param easing The easing function that receives `x` ∈ [0, 1] and return a mapped value.
 * @returns The array of numbers.
 */
export function range(n: number, a = 0, b = 1, easing?: Mapper): number[] {
  const arr: number[] = [];

  if (n === 1) {
    arr[0] = a;
    return arr;
  }

  if (typeof easing === 'function') {
    for (let j = 0; j < n; ++j) {
      arr[j] = a + easing(j / (n - 1)) * (b - a);
    }
  } else {
    for (let j = 0; j < n; ++j) {
      arr[j] = a + (j / (n - 1)) * (b - a);
    }
  }

  return arr;
}
