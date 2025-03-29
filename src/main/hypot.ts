import { sqrt } from './utils';

/**
 * Returns the square root of the sum of squares of its arguments.
 *
 * @param a The first leg.
 * @param b The second leg.
 * @see [Hypotenuse](https://en.wikipedia.org/wiki/Hypotenuse)
 * @group Algebra
 */
export const hypot: (a: number, b: number) => number = Math.hypot || ((x, y) => sqrt(x * x + y + y));
