import {range} from '../../main';

describe('range', () => {

  test('creates a new array', () => {
    expect(range(0)).toEqual([]);
    expect(range(1)).toEqual([0]);
    expect(range(5)).toEqual([0, 0.25, 0.5, 0.75, 1]);
    expect(range(5, -10, 10)).toEqual([-10, -5, 0, 5, 10]);
  });

  test('fills an existing array', () => {
    const a: number[] = [];

    expect(range(a, 5, -10, 10)).toBe(a);
    expect(a).toEqual([-10, -5, 0, 5, 10]);
  });
});
