import {abs, floor, min, round, trunc} from './math';

export function int(x: number): number {
  return trunc(x);
}

/**
 * Converts number to a large unsigned integer.
 */
export function uint(x: number): number {
  return floor(abs(x));
}

/**
 * Converts number to 8-bit unsigned integer.
 */
export function byte(x: number): number {
  return min(floor(abs(x)), 0xFF);
}
