import {pow} from './math';
import {int} from './cast';

const HI = 0x80_00_00_00;
const LO = 0x7F_FF_FF_FF;

/**
 * Bitwise left shift operator.
 */
export function left(x: number, shift: number): number {
  return int(x) * pow(2, int(shift));
}

/**
 * Bitwise right shift operator.
 */
export function right(x: number, shift: number): number {
  return int(x / pow(2, int(shift)));
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
