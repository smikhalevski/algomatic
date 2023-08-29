import {and, left, or, right, xor} from '../main';

describe('left', () => {

  test('shifts left', () => {
    expect(left(0xab_cd_ef_ab_cd, 24)).toBe(0xab_cd_ef_ab_cd_00_00_00);
  });

  test('handles NaN as native operator', () => {
    expect(left(NaN, 8)).toBe(0);
    expect(left(0xab_cd, NaN)).toBe(0xab_cd);
  });
});

describe('right', () => {

  test('shifts right', () => {
    expect(right(0xab_cd_ef_ab_cd_ef_ab, 24)).toBe(0xab_cd_ef_ab);
  });

  test('handles NaN as native operator', () => {
    expect(right(NaN, 8)).toBe(0);
    expect(right(0xab_cd, NaN)).toBe(0xab_cd);
  });
});

describe('xor', () => {

  test('applies XOR operator', () => {
    expect(xor(0x10_00_00_00_00, 0x10_10_10_10_10)).toBe(0x10_10_10_10);
  });

  test('handles NaN as native operator', () => {
    expect(xor(NaN, 0xab_cd)).toBe(0xab_cd);
    expect(xor(0xab_cd, NaN)).toBe(0xab_cd);
  });
});

describe('or', () => {

  test('applies OR operator', () => {
    expect(or(0xab_cd_ef_ab_cd, 0x11_22_33_44_55)).toBe(0xbb_ef_ff_ef_dd);
  });

  test('handles NaN as native operator', () => {
    expect(or(NaN, 0xab_cd)).toBe(0xab_cd);
    expect(or(0xab_cd, NaN)).toBe(0xab_cd);
  });
});

describe('and', () => {

  test('applies AND operator', () => {
    expect(and(0xab_cd_ef_ab_cd, 0x11_22_33_44_55)).toBe(0x1_00_23_00_45);
  });

  test('handles NaN as native operator', () => {
    expect(and(NaN, 0xab_cd)).toBe(0);
    expect(and(0xab_cd, NaN)).toBe(0);
  });
});
