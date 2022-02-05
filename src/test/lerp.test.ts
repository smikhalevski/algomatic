import {lerp} from '../main';

describe('lerp', () => {

  it('creates a linear interpolator', () => {
    const f = lerp([0, 1, 2], [0, 1, 0]);

    // expect(f(0)).toBeCloseTo(0);
    expect(f(0.5)).toBeCloseTo(0.5);
    // expect(f(1)).toBeCloseTo(1);
    // expect(f(1.5)).toBeCloseTo(0.5);
    // expect(f(2)).toBeCloseTo(0);
  });
});
