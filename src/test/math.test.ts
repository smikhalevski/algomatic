import {
  and,
  byte,
  clamp,
  clamp1,
  closest,
  cycle,
  deg,
  flip,
  isNumeric,
  left,
  logx,
  or,
  rad,
  right,
  snap,
  uint,
  xor,
} from '../main';

describe('left', () => {

  test('shifts left', () => {
    expect(left(0xAB_CD_EF_AB_CD, 24)).toBe(0xAB_CD_EF_AB_CD_00_00_00);
  });

  test('handles NaN as native operator', () => {
    expect(left(NaN, 8)).toBe(0);
    expect(left(0xAB_CD, NaN)).toBe(0xAB_CD);
  });
});

describe('right', () => {

  test('shifts right', () => {
    expect(right(0xAB_CD_EF_AB_CD_EF_AB, 24)).toBe(0xAB_CD_EF_AB);
  });

  test('handles NaN as native operator', () => {
    expect(right(NaN, 8)).toBe(0);
    expect(right(0xAB_CD, NaN)).toBe(0xAB_CD);
  });
});

describe('xor', () => {

  test('applies XOR operator', () => {
    expect(xor(0x10_00_00_00_00, 0x10_10_10_10_10)).toBe(0x10_10_10_10);
  });

  test('handles NaN as native operator', () => {
    expect(xor(NaN, 0xAB_CD)).toBe(0xAB_CD);
    expect(xor(0xAB_CD, NaN)).toBe(0xAB_CD);
  });
});

describe('or', () => {

  test('applies OR operator', () => {
    expect(or(0xAB_CD_EF_AB_CD, 0x11_22_33_44_55)).toBe(0xBB_EF_FF_EF_DD);
  });

  test('handles NaN as native operator', () => {
    expect(or(NaN, 0xAB_CD)).toBe(0xAB_CD);
    expect(or(0xAB_CD, NaN)).toBe(0xAB_CD);
  });
});

describe('and', () => {

  test('applies AND operator', () => {
    expect(and(0xAB_CD_EF_AB_CD, 0x11_22_33_44_55)).toBe(0x1_00_23_00_45);
  });

  test('handles NaN as native operator', () => {
    expect(and(NaN, 0xAB_CD)).toBe(0);
    expect(and(0xAB_CD, NaN)).toBe(0);
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

describe('logx', () => {

  test('returns 0', () => {
    expect(logx(0, 10)).toBe(0);
  });

  test('returns log of fractional value', () => {
    expect(logx(.1, 10)).toBe(-1);
    expect(logx(.01, 10)).toBe(-2);
    expect(logx(10 ** -6, 10)).toBe(-6);
  });

  test('returns log of positive integer value', () => {
    expect(logx(1, 10)).toBe(0);
    expect(logx(11, 10)).toBeCloseTo(1.04);
    expect(logx(333, 10)).toBeCloseTo(2.52);
    expect(logx(10 ** 6, 10)).toBe(6);
  });

  test('returns log of negative integer value', () => {
    expect(logx(-1, 10)).toBe(0);
    expect(logx(-11, 10)).toBeCloseTo(1.04);
    expect(logx(-333, 10)).toBeCloseTo(2.52);
    expect(logx(-(10 ** 6), 10)).toBe(6);
  });

  test('returns log of a very large number', () => {
    expect(logx(562_949_953_421_311, 10)).toBeCloseTo(14.75);
  });
});

describe('rad', () => {

  test('converts degrees to radians', () => {
    expect(rad(1)).toBeCloseTo(0.017);
    expect(rad(90)).toBe(Math.PI / 2);
  });
});

describe('deg', () => {

  test('converts radians to degrees', () => {
    expect(deg(Math.PI)).toBe(180);
    expect(deg(Math.PI / 2)).toBe(90);
  });
});

describe('clamp', () => {

  test('returns minimum', () => {
    expect(clamp(-1, 2, 4)).toBe(2);
  });

  test('returns maximum', () => {
    expect(clamp(100, 2, 4)).toBe(4);
  });

  test('returns value', () => {
    expect(clamp(3, 2, 4)).toBe(3);
  });

  test('handles non-numeric values', () => {
    expect(clamp('a' as any, 2, 4)).toBeNaN();
    expect(clamp('5' as any, 2, 4)).toBe(4);
  });
});

describe('clamp1', () => {

  test('returns minimum', () => {
    expect(clamp1(-2)).toBe(0);
  });

  test('returns maximum', () => {
    expect(clamp1(2)).toBe(1);
  });

  test('returns value', () => {
    expect(clamp1(.2)).toBe(.2);
  });

  test('handles non-numeric values', () => {
    expect(clamp1('a' as any)).toBeNaN();
    expect(clamp1('5' as any)).toBe(1);
  });
});

describe('cycle', () => {

  test('returns boundary values', () => {
    expect(cycle(0, 0, 10)).toBe(0);
    expect(cycle(0, 10, 0)).toBe(0);
    expect(cycle(10, 0, 10)).toBe(10);
  });

  test('brings number to range', () => {
    expect(cycle(11, 0, 10)).toBe(1);
    expect(cycle(150, 0, 100)).toBe(50);
    expect(cycle(123.5, 0, 1)).toBe(.5);
    expect(cycle(-50, 0, 100)).toBe(50);
    expect(cycle(.222, 0, -1)).toBe(-0.778);
    expect(cycle(333, 33, 100)).toBe(65);
    expect(cycle(-333, 33, 100)).toBe(69);
  });
});

describe('flip', () => {

  test('flips value from one range to another', () => {
    expect(flip(2, 1, 3, 0, 100)).toBe(50);
  });

  test('flips value between inverse ranges', () => {
    expect(flip(-75, -100, 0, 0, 100)).toBe(25);
  });

  test('flips value outside of initial range', () => {
    expect(flip(4, 1, 2, -100, 100)).toBe(500);
  });

  test('handles non-numeric values', () => {
    expect(flip('a' as any, 1, 3, 0, 100)).toBeNaN();
    expect(flip(1, 'a' as any, 3, 0, 100)).toBeNaN();
    expect(flip(2, 1, 'a' as any, 0, 100)).toBeNaN();
    expect(flip(2, 1, 3, 'a' as any, 100)).toBeNaN();
    expect(flip(2, 1, 3, 0, 'a' as any)).toBeNaN();
    expect(flip('2' as any, 1, 3, 0, 100)).toBe(50);
  });
});

describe('closest', () => {

  test('finds closest inside the range', () => {
    expect(closest(1.8, [3, 0])).toBe(3);
  });

  test('finds closest outside of the range', () => {
    expect(closest(-100, [1, 3, 0])).toBe(0);
  });
});

describe('snap', () => {

  test('rounds to a step', () => {
    expect(snap(-10, 3)).toBe(-9);
    expect(snap(-11, 3)).toBe(-12);
    expect(snap(10, 3)).toBe(9);
    expect(snap(11, 3)).toBe(12);
  });
});

describe('isNumeric', () => {

  test('returns true for number-like values', () => {
    expect(isNumeric(1)).toBe(true);
    expect(isNumeric('1')).toBe(true);
    expect(isNumeric('1a')).toBe(false);
    expect(isNumeric(null)).toBe(false);
  });
});
