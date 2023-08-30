import { Mapper } from './types';
import { exp } from './utils';

/**
 * Maps `x` ∈ [0, 1] exponentially to [0, 1].
 *
 * @param stiffness Greater values produce more bent curve, `easeExp(0)(x) = x`.
 * @group Easing
 */
export function easeExp(stiffness = 1): Mapper<number> {
  return x => (stiffness === 0 ? x : (exp(stiffness * x) - 1) / (exp(stiffness) - 1));
}
