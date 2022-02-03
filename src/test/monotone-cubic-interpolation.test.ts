import {createMonotoneCubicInterpolant} from '../main';

describe('createMonotoneCubicInterpolant', () => {

  it('creates spline', () => {
    const f = createMonotoneCubicInterpolant([0, 1, 2], [0, 1, 0]);

    expect(f(0)).toBeCloseTo(0);
    expect(f(0.5)).toBeCloseTo(0.625);
    expect(f(1)).toBeCloseTo(1);
    expect(f(1.5)).toBeCloseTo(0.625);
    expect(f(2)).toBeCloseTo(0);
  });
});
