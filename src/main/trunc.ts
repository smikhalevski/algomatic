import { Mapper } from './types';
import { ceil, floor } from './utils';

/**
 * Returns the integer part of a number by removing any fractional digits.
 *
 * @group Math
 */
export const trunc: Mapper<number> = Math.trunc || (x => (x < 0 ? ceil(x) : floor(x)));
