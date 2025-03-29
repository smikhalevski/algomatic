import { pow } from './utils';

/**
 * Bitwise left shift operator ({@link x} << {@link n}) for large unsigned integers.
 *
 * @example
 * left(0x11_22_33_44, 24)
 * // ⮕ 0x11_22_33_44_00_00_00
 *
 * @param x The integer.
 * @param n The number of bytes to shift to the left.
 * @group Bitwise Operations
 */
export function left(x: number, n: number): number {
  return x * pow(2, n | 0) || 0;
}
