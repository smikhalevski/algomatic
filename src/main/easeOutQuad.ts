import { Mapper } from './types';

/**
 * @group Easing
 */
export const easeOutQuad: Mapper<number> = x => x * (2 - x);
