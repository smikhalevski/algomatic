import {range} from '../main';

describe('range', () => {

  test('creates a new array', () => {
    expect(range(5)).toEqual([0, 0.25, 0.5, 0.75, 1]);
    expect(range(5, -10, 10)).toEqual([-10, -5, 0, 5, 10]);
  });

  test('fills an existing array', () => {
    const a: number[] = [];

    expect(range(5, -10, 10, a)).toBe(a);
    expect(a).toEqual([-10, -5, 0, 5, 10]);
  });
});
