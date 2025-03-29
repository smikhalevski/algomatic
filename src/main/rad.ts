import { Mapper } from './types';
import { PI } from './utils';

/**
 * Converts radians to degrees.
 *
 * @group Algebra
 */
export const rad: Mapper<number> = x => (x * PI) / 180;
