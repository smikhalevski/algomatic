import { pow } from './utils';
import { trunc } from './trunc';

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
  return trunc(x / pow(2, shift | 0)) || 0;
}
