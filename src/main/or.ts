import { MASK_LOWER, MASK_UPPER } from './utils';

/**
 * Bitwise OR operator ({@link a} ^ {@link b}) for large unsigned integers.
 *
 * @example
 * or(0x10_aa_bb_00_00_00_ff, 0x10_00_bb_cc_00_00_ff);
 * // ⮕ 0x10_aa_bb_cc_00_00_ff
 *
 * @param a The left integer.
 * @param b The right integer.
 * @group Bitwise Operations
 */
export function or(a: number, b: number): number {
  return ((a / MASK_UPPER) | (b / MASK_UPPER)) * MASK_UPPER + ((a & MASK_LOWER) | (b & MASK_LOWER));
}
