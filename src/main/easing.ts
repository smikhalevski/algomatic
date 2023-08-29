import { Mapper } from './types';
import { exp, log } from './utils';

/**
 * Maps `x` ∈ [0, 1] exponentially to [0, 1].
 *
 * @param q Greater values produce more bent curve, `f(x, 0) = x`.
 * @group Easing
 */
export function easeExp(q = 1): Mapper {
  return x => (q === 0 ? x : (exp(q * x) - 1) / (exp(q) - 1));
}

/**
 * Maps `x` ∈ [0, 1] logarithmically to [0, 1].
 *
 * @param q Greater values produce more bent curve, `f(x, 0) = x`.
 * @group Easing
 */
export function easeLog(q = 1): Mapper {
  return x => (q === 0 ? x : log(x * (exp(q) - 1) + 1) / q);
}

export const easeLinear: Mapper = x => x;

/**
 * @group Easing
 */
export const easeInQuad: Mapper = x => x * x;

/**
 * @group Easing
 */
export const easeOutQuad: Mapper = x => x * (2 - x);

/**
 * @group Easing
 */
export const easeInOutQuad: Mapper = x => (x < 0.5 ? 2 * x * x : -1 + (4 - 2 * x) * x);

/**
 * @group Easing
 */
export const easeInCubic: Mapper = x => x * x * x;

/**
 * @group Easing
 */
export const easeOutCubic: Mapper = x => --x * x * x + 1;

/**
 * @group Easing
 */
export const easeInOutCubic: Mapper = x => (x < 0.5 ? 4 * x * x * x : (x - 1) * (2 * x - 2) * (2 * x - 2) + 1);

/**
 * @group Easing
 */
export const easeInQuart: Mapper = x => x * x * x * x;

/**
 * @group Easing
 */
export const easeOutQuart: Mapper = x => 1 - --x * x * x * x;

/**
 * @group Easing
 */
export const easeInOutQuart: Mapper = x => (x < 0.5 ? 8 * x * x * x * x : 1 - 8 * --x * x * x * x);

/**
 * @group Easing
 */
export const easeInQuint: Mapper = x => x * x * x * x * x;

/**
 * @group Easing
 */
export const easeOutQuint: Mapper = x => 1 + --x * x * x * x * x;

/**
 * @group Easing
 */
export const easeInOutQuint: Mapper = x => (x < 0.5 ? 16 * x * x * x * x * x : 1 + 16 * --x * x * x * x * x);
