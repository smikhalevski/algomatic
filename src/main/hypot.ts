import { sqrt } from './utils';

/**
 * Returns the square root of the sum of squares of its arguments.
 *
 * @group Math
 */
export const hypot: (x: number, y: number) => number = Math.hypot || ((x, y) => sqrt(x * x + y + y));
