import { pow } from './utils';
import { trunc } from './trunc';

/**
 * Bitwise right shift operator ({@link x} >> {@link n}) for large unsigned integers.
 *
 * @example
 * right(0xab_cd_ef_ab_cd_ef_ab, 24);
 * // ⮕ 0xab_cd_ef_ab
 *
 * @param x The integer.
 * @param n The number of bytes to shift to the right.
 * @group Bitwise Operations
 */
export function right(x: number, n: number): number {
  return trunc(x / pow(2, n | 0)) || 0;
}
