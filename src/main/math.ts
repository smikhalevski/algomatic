export const {ceil, floor, pow, round, min, abs, PI, log10} = Math;

export const trunc = Math.trunc || ((x) => x < 0 ? ceil(x) : floor(x));

export const sign = Math.sign || ((x) => abs(x) / x);
