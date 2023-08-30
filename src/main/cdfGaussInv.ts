import { log, sqrt } from './utils';
import { Mapper } from './types';

/**
 * Inverse cumulative distribution function for Gaussian (normal) distribution.
 *
 * @group Distributions
 */
export const cdfGaussInv: Mapper<number> = x => {
  let q, r;

  if (x <= 0) {
    return -Infinity;
  }

  if (x >= 1) {
    return Infinity;
  }

  if (x < 0.02425 || x > 0.97575) {
    q = sqrt(-2 * log(x > 0.97575 ? 1 - x : x));

    const c =
      (((((-0.00778489400243029 * q + -0.322396458041136) * q + -2.40075827716184) * q + -2.54973253934373) * q +
        4.37466414146497) *
        q +
        2.93816398269878) /
      ((((0.00778469570904146 * q + 0.32246712907004) * q + 2.445134137143) * q + 3.75440866190742) * q + 1);

    return x > 0.97575 ? -c : c;
  }

  q = x - 0.5;
  r = q * q;

  return (
    ((((((-39.6968302866538 * r + 220.946098424521) * r + -275.928510446969) * r + 138.357751867269) * r +
      -30.6647980661472) *
      r +
      2.50662827745924) *
      q) /
    (((((-54.4760987982241 * r + 161.585836858041) * r + -155.698979859887) * r + 66.8013118877197) * r +
      -13.2806815528857) *
      r +
      1)
  );
};
