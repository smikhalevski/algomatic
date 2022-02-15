import {exp, log} from './native-math';

/**
 * Maps `t` ∈ [0, 1] exponentially to [0, 1].
 *
 * @param t The value to map.
 * @param q Greater values produce more bent curve, `f(t, 0) = t`.
 */
export function easeExp(t: number, q = 1): number {
  return q === 0 ? t : (exp(q * t) - 1) / (exp(q) - 1);
}

/**
 * Maps `t` ∈ [0, 1] logarithmically to [0, 1].
 *
 * @param t The value to map.
 * @param q Greater values produce more bent curve, `f(t, 0) = t`.
 */
export function easeLog(t: number, q = 1): number {
  return q === 0 ? t : log(t * (exp(q) - 1) + 1) / q;
}

export function easeInQuad(t: number): number {
  return t * t;
}

export function easeOutQuad(t: number): number {
  return t * (2 - t);
}

export function easeInOutQuad(t: number): number {
  return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function easeInCubic(t: number): number {
  return t * t * t;
}

export function easeOutCubic(t: number): number {
  return (--t) * t * t + 1;
}

export function easeInOutCubic(t: number): number {
  return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

export function easeInQuart(t: number): number {
  return t * t * t * t;
}

export function easeOutQuart(t: number): number {
  return 1 - (--t) * t * t * t;
}

export function easeInOutQuart(t: number): number {
  return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
}

export function easeInQuint(t: number): number {
  return t * t * t * t * t;
}

export function easeOutQuint(t: number): number {
  return 1 + (--t) * t * t * t * t;
}

export function easeInOutQuint(t: number): number {
  return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
}
