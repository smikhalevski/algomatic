import { Mapper } from './types';

/**
 * @group Easing
 */
export const easeInQuart: Mapper<number> = x => x * x * x * x;
