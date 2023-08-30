import { Mapper } from './types';

/**
 * Semantic shortcut for `n` \*\* 2.
 *
 * @group Math
 */
export const sq: Mapper<number> = x => x * x;
