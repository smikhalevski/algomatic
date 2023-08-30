import { MASK_LOWER, MASK_UPPER } from './utils';

/**
 * Bitwise AND operator for large unsigned integers.
 *
 * @param x The left integer.
 * @param y The right integer.
 * @group Bitwise Operations
 */
export function and(x: number, y: number): number {
  return ((x / MASK_UPPER) & (y / MASK_UPPER)) * MASK_UPPER + (x & MASK_LOWER & (y & MASK_LOWER));
}
