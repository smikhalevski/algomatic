import { Mapper } from './types';

/**
 * @group Easing
 */
export const easeInOutCubic: Mapper<number> = x => (x < 0.5 ? 4 * x * x * x : (x - 1) * (2 * x - 2) * (2 * x - 2) + 1);
