import { pow } from './utils';
import { trunc } from './trunc';

/**
 * Bitwise right shift operator ({@link x} >> {@link n}) for large unsigned integers.
 *
 * @example
 * right(0x11_22_22_44_55_66_77, 24);
 * // ⮕ 0x11_22_22_44
 *
 * @param x The integer.
 * @param n The number of bytes to shift to the right.
 * @group Bitwise Operations
 */
export function right(x: number, n: number): number {
  return trunc(x / pow(2, n | 0)) || 0;
}
