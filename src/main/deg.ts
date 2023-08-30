import { Mapper } from './types';
import { PI } from './utils';

/**
 * Converts degrees to radians.
 *
 * @group Math
 */
export const deg: Mapper<number> = x => (x / PI) * 180;
