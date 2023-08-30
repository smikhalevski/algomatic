import { pow } from './utils';

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
  return x * pow(2, shift | 0) || 0;
}
