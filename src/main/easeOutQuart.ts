import { Mapper } from './types';

/**
 * @group Easing
 */
export const easeOutQuart: Mapper<number> = x => 1 - --x * x * x * x;
