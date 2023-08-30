import { Mapper } from './types';

/**
 * @group Easing
 */
export const easeInOutQuint: Mapper<number> = x => (x < 0.5 ? 16 * x * x * x * x * x : 1 + 16 * --x * x * x * x * x);
