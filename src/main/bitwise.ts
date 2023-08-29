import { HI, LO, pow } from './utils';

/**
 * Bitwise left shift operator for large unsigned integers.
 *
 * ```ts
 * left(0xab, 8); // → 0xab_00
 * // or
 * 0xab << 8;
 * ```
 *
 * @group Bitwise Operations
 */
export function left(x: number, shift: number): number {
  return x * pow(2, shift);
}

/**
 * Bitwise right shift operator for large unsigned integers.
 *
 * ```ts
 * right(0xab_cd, 8); // → 0xab
 * // or
 * 0xab_cd >> 8;
 * ```
 *
 * @group Bitwise Operations
 */
export function right(x: number, shift: number): number {
  return x / pow(2, shift);
}

/**
 * Bitwise XOR operator for large unsigned integers.
 *
 * @group Bitwise Operations
 */
export function xor(a: number, b: number): number {
  return ((a / HI) ^ (b / HI)) * HI + ((a & LO) ^ (b & LO));
}

/**
 * Bitwise OR operator for large unsigned integers.
 *
 * @group Bitwise Operations
 */
export function or(a: number, b: number): number {
  return ((a / HI) | (b / HI)) * HI + ((a & LO) | (b & LO));
}

/**
 * Bitwise AND operator for large unsigned integers.
 *
 * @group Bitwise Operations
 */
export function and(a: number, b: number): number {
  return ((a / HI) & (b / HI)) * HI + (a & LO & (b & LO));
}
