# Algomatic

Various algorithms and utilities.

- High performance and low memory consumption (no heap allocations);
- Lightweight and tree-shakable;
- Thoroughly tested.

🔎 [API documentation is available here.](https://smikhalevski.github.io/algomatic/)

```shell
npm install --save-prod algomatic
```

- [Algebra](#algebra)
- [Bitwise operations](#bitwise-operations)
- [Distributions](#distributions)
- [Easing](#easing)
- [Interpolation](#interpolation)
- [Search](#search)
- [Sort](#sort)

# Algebra

Clamp a value to range:

```ts
import { clamp } from 'algomatic';

const f = clamp(5, 10);

f(33);
// ⮕ 10
```

Scale a value from one range to another:

```ts
const f = scale(0, 1, 50, 100);

f(75);
// ⮕ 0.5
```

Round a value to the closest value that is divided by divisor without any remainder:

```ts
const f = snap(10);

f(17);
// ⮕ 20
```

Bring a value to the range by adding or subtracting the range size:

```ts
const f = cycle(0, 10);

f(12);
// ⮕ 2
```

# Bitwise operations

Bitwise operators that can manipulate integers in
[[`MIN_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER), [`MAX_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)]
range:

```ts
import { left, right, and, or } from 'algomatic';

left(0x11, 8); // Same as 0x11 << 8
// ⮕ 0x11_00 

left(0x11_22_33_44, 24)
// ⮕ 0x11_22_33_44_00_00_00

right(0x11_22, 8); // Same as 0x11_22 >> 8
// ⮕ 0x11

right(0x11_22_22_44_55_66_77, 24);
// ⮕ 0x11_22_22_44

and(0x10_aa_bb_00_00_00_ff, 0x10_00_bb_cc_00_00_ff);
// ⮕ 0x10_00_bb_00_00_00_ff

or(0x10_aa_bb_00_00_00_ff, 0x10_00_bb_cc_00_00_ff);
// ⮕ 0x10_aa_bb_cc_00_00_ff

xor(0x10_aa_bb_00_00_00_ff, 0x10_00_bb_cc_00_00_ff);
// ⮕ 0xaa_00_cc_00_00_00
```

# Distributions

Create an array and fill it with numbers that are evenly distributed in a range:

```ts
import { seq } from 'algomatic';

seq(3);
// ⮕ [0, 0.5, 1]

seq(4, -10, 2);
// ⮕ [-10, -6, -2, 2]
```

Create gaussian distribution ([normal distribution](https://en.wikipedia.org/wiki/Normal_distribution)):

```ts
seq(3).map(gauss(0.5, 0.3));
// ⮕ [0.33, 1.32, 0.33]
```

Create [cumulative distribution function](https://en.wikipedia.org/wiki/Cumulative_distribution_function) for Gaussian
(normal) distribution:

```ts
seq(3).map(cdfGauss(0.5, 0.3));
// ⮕ [ 0.04, 0.5, 0.95 ]
```

[Inverse distribution function (quantile function)](https://en.wikipedia.org/wiki/Cumulative_distribution_function#Inverse_distribution_function_(quantile_function))
for Gaussian (normal) distribution:

```ts
seq(3).map(cdfGaussInv);
```

# Easing

Various easing functions:

```ts
import { easeExp, easeInCubic } from 'algomatic';

const f = easeExp();

f(0.5)
// ⮕ 0.3775

easeInCubic(0.5);
// ⮕ 0.125
```

# Interpolation

Linear interpolator:

```ts
import { lerp } from 'algomatic';

const f = lerp(xs, ys);

const y = f(x);
```

Here `xs` is the array of X coordinates of pivot points in ascending order, and `ys` is the array of corresponding Y
coordinates of pivot points.

[A cubic spline interpolator](https://en.wikipedia.org/wiki/Spline_(mathematics)#Algorithm_for_computing_natural_cubic_splines)
for given pivot points:

```ts
const f = cspline(xs, ys);
const y = f(x);
```

More control over cubic spline caching and computation:

```ts
import { interpolateCSpline, populateCSplines } from 'algomatic';

// Pre-allocate an array of spline components that can be later reused
// to avoid excessive memory allocations
const splines = new Float32Array(xs.length * 3);

populateCSplines(xs, ys, xs.length, splines);
// or
// const splines = createCSplines(xs, ys, xs.length);

const y = interpolateCSpline(xs, ys, x, xs.length, splines);
```

[A monotone cubic interpolator](https://en.wikipedia.org/wiki/Monotone_cubic_interpolation) for given pivot points:

```ts
const f = csplineMonot(xs, ys);
const y = f(x);
```

Or using more fine-grained approach:

```ts
import { interpolateCSplineMonot, populateCSplinesMonot } from 'algomatic';

const y = interpolateCSplineMonot(xs, ys, x, xs.length, populateCSplinesMonot(xs, ys, xs.length));
```

# Search

Binary search searches the specified array for the specified value using the binary search algorithm. The array must be
sorted into ascending order according to the natural ordering of its elements prior to making this call. If it is not
sorted, the results are undefined.

Returns the index of the searched value, if it is contained in the array; otherwise, -(insertion point) - 1. The
insertion point is defined as the point at which the searched value would be inserted into the array: the index of the
first element greater than the searched value, or array length if all elements in the array are less than the specified
key. Note that this guarantees that the return value will be ≥ 0 if and only if the searched value is found.

```ts
import { binarySearch } from 'algomatic';

binarySearch([10, 20, 30, 40], 20);
// ⮕ 1

binarySearch([10, 20, 30, 40], 25);
// ⮕ -3
```

Binary search with a comparator:

```ts
binarySearchComp(
  [{x: 10}, {x: 20}, {x: 30}],
  {x: 20},
  (a, b) => a.x - b.x
);
```

# Sort

Sort the array in-place:

```ts
import { qsort } from 'algomatic';

const arr = [3, 2, 0, 1];

qsort(arr);
```

Sort the array in-place and invoke a callback after a pair of elements was swapped:

```ts
qsort(arr, (i, j) => {
  // Called when i and j elements of arr were swapped.
  // Use this to sort multiple arrays in parallel.
});
```

Sort using a comparator:

```ts
qsort(arr, undefined, (a, b) => {
  // Comparator works the same way as in Array.sort
  return 0;
});
```

`qsort` uses a non-recursive [Quicksort](https://en.wikipedia.org/wiki/Quicksort) algorithm. In contrast to
[`Array.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), `qsort`
doesn't convert array elements to strings before comparison and uses comparison operators directly. So numeric arrays
are sorted in natural order with `qsort(arr)`. You can provide an element comparator to change the sorting order.

`qsort` is _10x_ faster than `Array.sort` on both small and big arrays. The plot below uses a log scale and
shows the dependency of number of operations per second from the input array length.
