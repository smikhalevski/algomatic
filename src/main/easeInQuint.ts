import { Mapper } from './types';

/**
 * @group Easing
 */
export const easeInQuint: Mapper<number> = x => x * x * x * x * x;
