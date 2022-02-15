import {int} from './math-utils';
import {pow} from './native-math';

const HI = 0x80_00_00_00;
const LO = 0x7F_FF_FF_FF;

/**
 * Bitwise left shift operator for large unsigned integers.
 *
 * ```ts
 * left(0xAB, 8); // → 0xAB_00
 * // or
 * 0xAB << 8;
 * ```
 */
export function left(x: number, shift: number): number {
  return int(x) * pow(2, int(shift));
}

/**
 * Bitwise right shift operator for large unsigned integers.
 *
 * ```ts
 * right(0xAB_CD, 8); // → 0xAB
 * // or
 * 0xAB_CD >> 8;
 * ```
 */
export function right(x: number, shift: number): number {
  return int(x / pow(2, int(shift)));
}

/**
 * Bitwise XOR operator for large unsigned integers.
 */
export function xor(a: number, b: number): number {
  return ((a / HI) ^ (b / HI)) * HI + ((a & LO) ^ (b & LO));
}

/**
 * Bitwise OR operator for large unsigned integers.
 */
export function or(a: number, b: number): number {
  return ((a / HI) | (b / HI)) * HI + ((a & LO) | (b & LO));
}

/**
 * Bitwise AND operator for large unsigned integers.
 */
export function and(a: number, b: number): number {
  return ((a / HI) & (b / HI)) * HI + ((a & LO) & (b & LO));
}
