import { Mapper } from './types';

/**
 * @group Easing
 */
export const easeOutCubic: Mapper<number> = x => --x * x * x + 1;
