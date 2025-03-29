import { Mapper } from './types';

/**
 * @group Easing
 */
export const easeOutQuint: Mapper<number> = x => 1 + --x * x * x * x * x;
