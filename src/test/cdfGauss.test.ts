import { cdfGauss } from '../main';

test('returns CDF for normal distribution', () => {
  expect(cdfGauss(0, 1)(2)).toBe(0.9772);
  expect(cdfGauss(0, 1)(0)).toBe(0.5);
  expect(cdfGauss(4, 2)(-1)).toBe(0.006199999999999983);

  expect(cdfGauss(NaN, 0)(0)).toBe(NaN);
  expect(cdfGauss(0, NaN)(0)).toBe(NaN);
  expect(cdfGauss(0, 1)(NaN)).toBe(NaN);
});
