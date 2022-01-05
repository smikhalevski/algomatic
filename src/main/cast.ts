import {abs, floor, min, trunc} from './math';

/**
 * Returns `x` as is or `n` if `x` is `NaN`.
 */
export function unNaN(x: any, n = 0): number {
  return isNaN(+x) ? n : +x;
}

/**
 * Converts number to a non-Null large integer.
 */
export function int(x: number): number {
  return trunc(unNaN(x));
}

/**
 * Converts number to a non-Null large unsigned integer.
 */
export function uint(x: number): number {
  return floor(abs(unNaN(x)));
}

/**
 * Converts number to non-Null 8-bit unsigned integer.
 */
export function byte(x: number): number {
  return min(uint(x), 0xFF);
}
