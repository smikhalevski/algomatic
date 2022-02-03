import {cubicSpline} from '../main';

describe('cubicSpline', () => {

  it('creates spline', () => {
    const xs = [0, 1, 2];
    const ys = [0, 1, 0];

    expect(cubicSpline(xs, ys, 0)).toBeCloseTo(0);
    expect(cubicSpline(xs, ys, 0.5)).toBeCloseTo(0.6875);
    expect(cubicSpline(xs, ys, 1)).toBeCloseTo(1);
    expect(cubicSpline(xs, ys, 1.5)).toBeCloseTo(0.6875);
    expect(cubicSpline(xs, ys, 2)).toBeCloseTo(0);
  });
});
