import {and, left, or, right, xor} from '../main';

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
