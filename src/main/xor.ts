import { MASK_UPPER, MASK_LOWER } from './utils';

/**
 * Bitwise XOR operator for large unsigned integers.
 *
 * @group Bitwise Operations
 */
export function xor(a: number, b: number): number {
  return ((a / MASK_UPPER) ^ (b / MASK_UPPER)) * MASK_UPPER + ((a & MASK_LOWER) ^ (b & MASK_LOWER));
}
