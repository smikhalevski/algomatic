import { Mapper } from './types';

/**
 * @group Easing
 */
export const easeInOutQuart: Mapper<number> = x => (x < 0.5 ? 8 * x * x * x * x : 1 - 8 * --x * x * x * x);
