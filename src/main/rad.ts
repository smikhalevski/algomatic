import { Mapper } from './types';
import { PI } from './utils';

/**
 * Converts radians to degrees.
 *
 * @group Math
 */
export const rad: Mapper<number> = x => (x * PI) / 180;
