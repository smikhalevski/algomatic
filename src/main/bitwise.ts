import {pow, trunc} from './math';

const HI = 0x80000000;
const LO = 0x7fffffff;

/**
 * Bitwise signed left shift operator.
 */
export function left(x: number, shift: number): number {
  return trunc(x) * pow(2, shift);
}

/**
 * Bitwise signed right shift operator.
 */
export function right(x: number, shift: number): number {
  return trunc(x / pow(2, shift));
}

/**
 * Bitwise XOR operator.
 */
export function xor(a: number, b: number): number {
  return ((a / HI) ^ (b / HI)) * HI + ((a & LO) ^ (b & LO));
}

/**
 * Bitwise OR operator.
 */
export function or(a: number, b: number): number {
  return ((a / HI) | (b / HI)) * HI + ((a & LO) | (b & LO));
}

/**
 * Bitwise AND operator.
 */
export function and(a: number, b: number): number {
  return ((a / HI) & (b / HI)) * HI + ((a & LO) & (b & LO));
}
