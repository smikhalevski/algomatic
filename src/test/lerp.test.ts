import { lerp } from '../main';

describe('lerp', () => {
  it('creates a linear interpolator', () => {
    const f = lerp([0, 1, 2], [0, 1, 0]);

    expect(f(0)).toBe(0);
    expect(f(0.5)).toBe(0.5);
    expect(f(1)).toBe(1);
    expect(f(1.5)).toBe(0.5);
    expect(f(2)).toBe(0);
  });
});
