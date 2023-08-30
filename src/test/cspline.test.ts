import { cspline } from '../main';

test('creates a cubic spline interpolator', () => {
  const fn = cspline([0, 1, 2], [0, 1, 0]);

  expect(fn(0)).toBeCloseTo(0);
  expect(fn(0.5)).toBeCloseTo(0.6875);
  expect(fn(1)).toBeCloseTo(1);
  expect(fn(1.5)).toBeCloseTo(0.6875);
  expect(fn(2)).toBeCloseTo(0);
});
