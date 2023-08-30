import { csplineMonot } from '../main';

test('creates a monotonous cubic spline interpolator', () => {
  const fn = csplineMonot([0, 1, 2], [0, 1, 0]);

  expect(fn(-1)).toBeCloseTo(0);
  expect(fn(0)).toBeCloseTo(0);
  expect(fn(0.5)).toBeCloseTo(0.625);
  expect(fn(1)).toBeCloseTo(1);
  expect(fn(1.5)).toBeCloseTo(0.625);
  expect(fn(2)).toBeCloseTo(0);
});
