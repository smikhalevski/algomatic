import {abs, ceil, log10, PI, sign} from './math';

/**
 * Returns the logarithm of `x` with base `n`.
 *
 * ```ts
 * logx(64, 2) // → 6
 * logx(1000, 10) // → 3
 * logx(99, 10) // → 1.99563519459755
 * logx(0.01, 10) // → -2
 * ```
 */
export function logx(x: number, n: number): number {
  return x === 0 ? 0 : log10(abs(x)) / log10(n);
}

/**
 * Returns -1 if `a` < `b`, 1 if `a` > `b` and 0 otherwise.
 */
export function asc(a: number, b: number): number {
  return sign(a - b);
}

/**
 * Clamps `x` to range [`a`, `b`].
 *
 * Range can be inverse.
 *
 * @see {@link clamp01}
 */
export function clamp(x: number, a: number, b: number): number {
  if (a > b) {
    const c = b;
    b = a;
    a = c;
  }
  return x < a ? a : x > b ? b : x;
}

/**
 * Clamps `x` to range [0, 1].
 *
 * @see {@link clamp}
 */
export function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

/**
 * Flips `x` ∈ [`a1`, `b1`] to [`a2`, `b2`].
 *
 * Ranges can be inverse.
 */
export function flip(x: number, a1: number, b1: number, a2: number, b2: number): number {
  return a2 + (b2 - a2) * (x - a1) / (b1 - a1);
}

/**
 * Brings `x` to the rangeMap [`a`, `b`] by adding or subtracting the rangeMap size |`a` - `b`|.
 *
 * Range can be inverse.
 *
 * ```ts
 * cycle(12, 0, 10) // → 2
 * cycle(-333, 100, 33) // → 69
 * ```
 *
 * @see {@link snap}
 */
export function cycle(x: number, a: number, b: number): number {
  if (a > b) {
    const c = b;
    b = a;
    a = c;
  }
  const d = b - a;
  return x > a ? x - ceil((x - b) / d) * d : x + ceil((a - x) / d) * d;
}

/**
 * Converts radians to degrees.
 *
 * @see {@link deg}
 */
export function rad(x: number): number {
  return x * PI / 180;
}

/**
 * Converts degrees to radians.
 *
 * @see {@rad}
 */
export function deg(x: number): number {
  return x / PI * 180;
}

/**
 * Linear interpolation.
 *
 * @param x the value to interpolate.
 * @param a the slope of the line (angle between line an X axis).
 * @param b the offset the line on Y axis.
 */
export function lerp(x: number, a: number, b: number): number {
  return a + x * (b - a);
}

/**
 * Semantic shortcut for `n` ^ 2.
 */
export function pow2(n: number): number {
  return n * n;
}

/**
 * Rounds `x` to the closest value that is divided by `n` without any remainder.
 *
 * ```ts
 * snap(17, 10) // → 20
 * snap(-10, 3) // → -9
 * ```
 *
 * @see {@link cycle}
 */
export function snap(x: number, n: number): number {
  const r = x % n;
  return abs(r) < n / 2 ? x - r : x - r + n * sign(x);
}

/**
 * Returns the closest value to `x` from `arr`.
 *
 * If `arr` is empty then `x` is returned as is.
 *
 * ```ts
 * closest(1.8, [0, 3, 6]) // → 3
 * ```
 *
 * @see {@link isEpsClose}
 */
export function closest(x: number, arr: number[]): number {
  let r = x;
  let p = 1 / 0;

  for (const n of arr) {
    const q = abs(n - x);

    if (q < p) {
      r = n;
      p = q;
    }
  }
  return r;
}

/**
 * Returns `true` if `x` is in the `eps` neighbourhood of `a`.
 *
 * @see {@link closest}
 */
export function isEpsClose(x: number, a: number, eps = 0.01): boolean {
  return abs(a - x) < eps;
}

/**
 * Returns `true` if `x` is in range [`a`, `b`].
 *
 * Range can be inverse.
 */
export function isBetween(x: number, a: number, b: number): boolean {
  if (a > b) {
    const c = b;
    b = a;
    a = c;
  }
  return a <= x && x <= b;
}
