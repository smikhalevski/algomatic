import { Mapper } from './types';

/**
 * Scales value from [`a`, `b`] range to [`nextA`, `nextB`] range.
 *
 * ```ts
 * scale(0, 1, 50, 100)(75);
 * // ⮕ 0.5
 *
 * scale(50, 100)(0.5);
 * // ⮕ 75
 * ```
 *
 * @param a The minimum value of output range.
 * @param b The maximum value of output range.
 * @param inputA The minimum value of input range.
 * @param inputB The maximum value of input range.
 * @returns Mapper that handles the input value scaling.
 * @group Distributions
 */
export function scale(a: number, b: number, inputA = 0, inputB = 1): Mapper<number> {
  return x => a + ((b - a) * (x - inputA)) / (inputB - inputA);
}
