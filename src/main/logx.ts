import { log10 } from './utils';

/**
 * Returns the logarithm of `x` with base `base`.
 *
 * ```ts
 * logx(64, 2);
 * // ⮕ 6
 *
 * logx(1000, 10);
 * // ⮕ 3
 *
 * logx(99, 10);
 * // ⮕ 1.99563519459755
 *
 * logx(0.01, 10);
 * // ⮕ -2
 * ```
 *
 * @param x The number.
 * @param base The base.
 * @group Math
 */
export function logx(x: number, base: number): number {
  return log10(x) / log10(base);
}
