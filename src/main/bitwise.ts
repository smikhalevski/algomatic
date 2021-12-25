import {pow, trunc} from './math';

const HI = 0x80_00_00_00;
const LO = 0x7F_FF_FF_FF;

/**
 * Bitwise left shift operator.
 */
export function left(x: number, shift: number): number {
  return trunc(x || 0) * pow(2, shift || 0);
}

/**
 * Bitwise right shift operator.
 */
export function right(x: number, shift: number): number {
  return trunc((x || 0) / pow(2, shift || 0));
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
