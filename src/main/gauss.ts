import { Mapper } from './types';
import { exp, PI, sqrt } from './utils';

/**
 * Gaussian distribution.
 *
 * @param m Mean.
 * @param d Standard deviation.
 */
export function gauss(m = 0, d = 1): Mapper {
  const q = d * sqrt(2 * PI);

  return x => {
    x = (x - m) / d;
    return exp(-0.5 * x * x) / q;
  };
}
