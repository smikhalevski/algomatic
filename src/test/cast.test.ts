import {byte, unNaN, uint} from '../main';

describe('float', () => {

  test('returns float', () => {
    expect(unNaN('1')).toBe(1);
    expect(unNaN('a')).toBe(0);
  });
});

describe('uint', () => {

  test('returns unsigned int', () => {
    expect(uint(-123123123.123)).toBe(123123123);
    expect(uint(123123123.123)).toBe(123123123);
    expect(uint(NaN)).toBe(0);
  });
});

describe('byte', () => {

  test('returns unsigned byte', () => {
    expect(byte(-105.666)).toBe(105);
    expect(byte(105.666)).toBe(105);
    expect(byte(-123123123.123)).toBe(0xFF);
    expect(byte(123123123.123)).toBe(0xFF);
    expect(byte(NaN)).toBe(0);
  });
});
