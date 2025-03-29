import { Mapper } from './types';

/**
 * @group Easing
 */
export const easeInCubic: Mapper<number> = x => x * x * x;
