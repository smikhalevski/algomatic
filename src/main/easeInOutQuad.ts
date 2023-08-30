import { Mapper } from './types';

/**
 * @group Easing
 */
export const easeInOutQuad: Mapper<number> = x => (x < 0.5 ? 2 * x * x : -1 + (4 - 2 * x) * x);
