import { Mapper } from './types';
import { abs } from './utils';

/**
 * Returns a +/- 1, indicating the sign of a number passed into the argument.
 *
 * If the number  passed into {@link sign} is 0, it will return a +/- 0. Note that if the number is positive,
 * an explicit (+) will not be returned.
 *
 * @group Algebra
 */
export const sign: Mapper<number> = Math.sign || (x => abs(x) / x);
