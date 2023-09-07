import { Mapper } from './types';
import { exp, PI, sqrt } from './utils';

/**
 * Gaussian (normal) distribution.
 *
 * ```ts
 * seq(3).map(gauss(0.5, 0.3))
 * // ⮕ [0.33, 1.32, 0.33]
 * ```
 *
 * @param [mean = 0] The mean value.
 * @param [deviation = 1] Standard deviation.
 * @group Distributions
 */
export function gauss(mean = 0, deviation = 1): Mapper<number> {
  const q = deviation * sqrt(2 * PI);

  return x => {
    x = (x - mean) / deviation;
    return exp(-0.5 * x * x) / q;
  };
}
