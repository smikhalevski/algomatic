import { cdf } from '../main/cdf';

describe('cdf', () => {
  test('', () => {
    expect(cdf(0, 1)(2)).toBe(0.9772);
    expect(cdf(0, 1)(0)).toBe(0.5);
    expect(cdf(4, 2)(-1)).toBe(0.006199999999999983);

    expect(cdf(NaN, 0)(0)).toBe(NaN);
    expect(cdf(0, NaN)(0)).toBe(NaN);
    expect(cdf(0, 1)(NaN)).toBe(NaN);
  });
});
