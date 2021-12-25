import {byte, uint} from '../main';

describe('uint', () => {

  test('returns unsigned int', () => {
    expect(uint(-123123123.123)).toBe(123123123);
    expect(uint(123123123.123)).toBe(123123123);
  });

  test('returns NaN', () => {
    expect(uint(NaN)).toBeNaN();
  });
});

describe('byte', () => {

  test('returns unsigned byte', () => {
    expect(byte(-105.666)).toBe(105);
    expect(byte(105.666)).toBe(105);
    expect(byte(-123123123.123)).toBe(0xFF);
    expect(byte(123123123.123)).toBe(0xFF);
  });

  test('returns NaN', () => {
    expect(byte(NaN)).toBeNaN();
  });
});
