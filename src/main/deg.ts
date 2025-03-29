import { Mapper } from './types';
import { PI } from './utils';

/**
 * Converts degrees to radians.
 *
 * @group Algebra
 */
export const deg: Mapper<number> = x => (x / PI) * 180;
