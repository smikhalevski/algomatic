import { Mapper } from './types';

/**
 * Semantic shortcut for `x` \*\* 2.
 *
 * @group Algebra
 */
export const sq: Mapper<number> = x => x * x;
