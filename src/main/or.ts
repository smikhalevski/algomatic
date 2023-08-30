import { MASK_UPPER, MASK_LOWER } from './utils';

/**
 * Bitwise OR operator for large unsigned integers.
 *
 * @param x The left integer.
 * @param y The right integer.
 * @group Bitwise Operations
 */
export function or(x: number, y: number): number {
  return ((x / MASK_UPPER) | (y / MASK_UPPER)) * MASK_UPPER + ((x & MASK_LOWER) | (y & MASK_LOWER));
}
