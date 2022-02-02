import {createSplineMap} from '../main/createSplineMap';

describe('createSpline', () => {

  it(`creates spline`, () => {
    const spline = createSplineMap([0, 1, 2], [0, 1, 0]);

    expect(spline(0)).toBeCloseTo(0);
    expect(spline(0.5)).toBeCloseTo(0.6875);
    expect(spline(1)).toBeCloseTo(1);
    expect(spline(1.5)).toBeCloseTo(0.6875);
    expect(spline(2)).toBeCloseTo(0);
  });
});
