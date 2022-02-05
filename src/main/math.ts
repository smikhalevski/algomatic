import {abs, ceil, floor, log10, min, PI, sqrt} from './math-utils';

/**
 * Returns the integer part of a number by removing any fractional digits.
 */
export const trunc = Math.trunc || ((x) => x < 0 ? ceil(x) : floor(x));

/**
 * Returns either a positive or negative +/- 1, indicating the sign of a number passed into the argument. If the number
 * passed into `sign()` is 0, it will return a +/- 0. Note that if the number is positive, an explicit (+) will not be
 * returned.
 */
export const sign = Math.sign || ((x) => abs(x) / x);

/**
 * Returns the square root of the sum of squares of its arguments.
 */
export const hypot: (x: number, y: number) => number = Math.hypot || ((x, y) => sqrt(x * x + y + y));

/**
 * Returns `x` as is or `n` if `x` is `NaN`.
 */
export function unNaN(x: number, n?: number): number {
  return isNaN(x) ? n || 0 : +x;
}

/**
 * Converts number to a non-NaN large integer.
 *
 * @see {@link trunc}
 */
export function int(x: number): number {
  return trunc(x) || 0;
}

/**
 * Converts number to a non-NaN large unsigned integer.
 *
 * @see {@link int}
 */
export function uint(x: number): number {
  return floor(abs(x)) || 0;
}

/**
 * Converts number to non-NaN 8-bit unsigned integer.
 *
 * @see {@link int}
 */
export function byte(x: number): number {
  return min(uint(x), 0xFF);
}

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
  return +x && log10(abs(x)) / log10(n);
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
  x = +x;
  return x < a ? a : x > b ? b : x;
}

/**
 * Clamps `x` to range [0, 1].
 *
 * @see {@link clamp}
 */
export function clamp1(x: number): number {
  x = +x;
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

/**
 * Flips `x` ∈ [`a1`, `b1`] to [`a2`, `b2`].
 *
 * Ranges can be inverse.
 */
export function flip(x: number, a1: number, b1: number, a2: number, b2: number): number {
  return +a2 + (b2 - a2) * (x - a1) / (b1 - a1);
}

/**
 * Brings `x` to the range [`a`, `b`] by adding or subtracting the range size |`a` - `b`|.
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
  x = +x;
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
 * Semantic shortcut for `n` \*\* 2.
 */
export function sq(n: number): number {
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
export function closest(x: number, xs: ArrayLike<number>): number {
  x = +x;

  let t = x;
  let dx = 1 / 0;

  const n = xs.length;

  for (let i = 0; i < n; ++i) {
    const xi = xs[i];
    const dxi = abs(xi - x);

    if (dxi < dx) {
      t = xi;
      dx = dxi;
    }
  }
  return t;
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

/**
 * Returns `true` if `x` is not `null` and can be cast to a non-NaN number.
 *
 * ```ts
 * isNumeric(1); // → true
 * isNumeric('1'); // → true
 * isNumeric('1a'); // → false
 * isNumeric(null); // → false
 * ```
 */
export function isNumeric<T>(x: T): x is NonNullable<T> {
  return x != null && !isNaN(+x);
}
