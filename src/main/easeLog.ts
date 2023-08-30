import { Mapper } from './types';
import { exp, log } from './utils';

/**
 * Maps `x` ∈ [0, 1] logarithmically to [0, 1].
 *
 * @param stiffness Greater values produce more bent curve, `easeLog(0)(x) = x`.
 * @group Easing
 */
export function easeLog(stiffness = 1): Mapper<number> {
  return x => (stiffness === 0 ? x : log(x * (exp(stiffness) - 1) + 1) / stiffness);
}
