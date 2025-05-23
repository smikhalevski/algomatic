import { Mapper } from './types';
import { exp, PI, sqrt } from './utils';

/**
 * Gaussian (normal) distribution.
 *
 * @example
 * seq(3).map(gauss(0.5, 0.3));
 * // ⮕ [0.33, 1.32, 0.33]
 *
 * @param mean The mean value.
 * @param deviation Standard deviation.
 * @see [Normal distribution](https://en.wikipedia.org/wiki/Normal_distribution)
 * @group Distributions
 */
export function gauss(mean = 0, deviation = 1): Mapper<number> {
  const q = deviation * sqrt(2 * PI);

  return x => {
    x = (x - mean) / deviation;
    return exp(-0.5 * x * x) / q;
  };
}
