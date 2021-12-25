import {left} from '../main';

describe('left', () => {

  test('shifts left', () => {
    expect(left(0xFF_FF_FF_FF_FF, 8)).toBe(0xFF_FF_FF_FF_FF_00);
  });
});
