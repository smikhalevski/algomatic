# Algomatic [![build](https://github.com/smikhalevski/algomatic/actions/workflows/master.yml/badge.svg?branch=master&event=push)](https://github.com/smikhalevski/algomatic/actions/workflows/master.yml)

Various algorithms and utilities.

- High performance and low memory consumption: in-out arguments and no heap allocations;
- Lightweight and tree-shakable;
- Thoroughly tested.

Algomatic is used in [Paint Bucket](https://github.com/smikhalevski/paint-bucket#readme), an extremely fast color
manipulation library, check out [its performance](https://github.com/smikhalevski/paint-bucket#performance).

🔢 [API documentation is available here.](https://smikhalevski.github.io/algomatic/)

```shell
npm install --save-prod algomatic
```

- [Arrays](#arrays)<br>
  [`binarySearch`](#binarysearch)
  [`sort`](#sort)<sup> 🚀</sup>
  [`copyOver`](https://smikhalevski.github.io/algomatic/modules.html#copyOver)
  [`range`](https://smikhalevski.github.io/algomatic/modules.html#range)
  [`swap`](https://smikhalevski.github.io/algomatic/modules.html#swap)
  [`asc`](https://smikhalevski.github.io/algomatic/modules.html#asc)
  [`desc`](https://smikhalevski.github.io/algomatic/modules.html#desc)

- [Interpolation](#interpolation)<br>
  [`lerp`](#lerp)
  [`cspline`](#cspline)
  [`csplineMonot`](#csplinemonot)

- [Bitwise](#bitwise)<br>
  [`int`](#bitwise)
  [`byte`](#bitwise)
  [`uint`](#bitwise)
  [`left`](#bitwise)
  [`right`](#bitwise)
  [`and`](#bitwise)
  [`or`](#bitwise)
  [`xor`](#bitwise)

- Numbers<br>
  [`unNaN`](https://smikhalevski.github.io/algomatic/modules.html#unNaN)
  [`clamp`](https://smikhalevski.github.io/algomatic/modules.html#clamp)
  [`clamp1`](https://smikhalevski.github.io/algomatic/modules.html#clamp1)
  [`closest`](https://smikhalevski.github.io/algomatic/modules.html#closest)
  [`cycle`](https://smikhalevski.github.io/algomatic/modules.html#cycle)
  [`snap`](https://smikhalevski.github.io/algomatic/modules.html#snap)
  [`flip`](https://smikhalevski.github.io/algomatic/modules.html#flip)

- Math<br>
  [`logx`](https://smikhalevski.github.io/algomatic/modules.html#logx)
  [`deg`](https://smikhalevski.github.io/algomatic/modules.html#deg)
  [`rad`](https://smikhalevski.github.io/algomatic/modules.html#rad)
  [`sq`](https://smikhalevski.github.io/algomatic/modules.html#sq)
  [`sign`](https://smikhalevski.github.io/algomatic/modules.html#sign)
  [`trunc`](https://smikhalevski.github.io/algomatic/modules.html#trunc)

- Checks<br>
  [`isBetween`](https://smikhalevski.github.io/algomatic/modules.html#isBetween)
  [`isEpsClose`](https://smikhalevski.github.io/algomatic/modules.html#isEpsClose)
  [`isNumeric`](https://smikhalevski.github.io/algomatic/modules.html#isNumeric)

- Functions<br>
  [`callOrGet`](https://smikhalevski.github.io/algomatic/modules.html#callOrGet)

- Easing<br>
  [`easeExp`](https://smikhalevski.github.io/algomatic/modules.html#easeExp)
  [`easeLog`](https://smikhalevski.github.io/algomatic/modules.html#easeLog)
  [`easeInQuad`](https://smikhalevski.github.io/algomatic/modules.html#easeInQuad)
  [`easeOutQuad`](https://smikhalevski.github.io/algomatic/modules.html#easeOutQuad)
  [`easeInOutQuad`](https://smikhalevski.github.io/algomatic/modules.html#easeInOutQuad)
  [`easeInCubic`](https://smikhalevski.github.io/algomatic/modules.html#easeInCubic)
  [`easeOutCubic`](https://smikhalevski.github.io/algomatic/modules.html#easeOutCubic)
  [`easeInOutCubic`](https://smikhalevski.github.io/algomatic/modules.html#easeInOutCubic)
  [`easeInQuart`](https://smikhalevski.github.io/algomatic/modules.html#easeInQuart)
  [`easeOutQuart`](https://smikhalevski.github.io/algomatic/modules.html#easeOutQuart)
  [`easeInOutQuart`](https://smikhalevski.github.io/algomatic/modules.html#easeInOutQuart)
  [`easeInQuint`](https://smikhalevski.github.io/algomatic/modules.html#easeInQuint)
  [`easeOutQuint`](https://smikhalevski.github.io/algomatic/modules.html#easeOutQuint)
  [`easeInOutQuint`](https://smikhalevski.github.io/algomatic/modules.html#easeInOutQuint)

# Arrays

Utilities
[`copyOver`](https://smikhalevski.github.io/algomatic/modules.html#copyOver)
[`range`](https://smikhalevski.github.io/algomatic/modules.html#range)
[`swap`](https://smikhalevski.github.io/algomatic/modules.html#swap)
[`asc`](https://smikhalevski.github.io/algomatic/modules.html#asc)
[`desc`](https://smikhalevski.github.io/algomatic/modules.html#desc)

### `binarySearch`

Searches the specified array for the specified value using the binary search algorithm. The array must be sorted into
ascending order according to the natural ordering of its elements prior to making this call. If it is not sorted, the
results are undefined.

Returns the index of the searched value, if it is contained in the array; otherwise, -(insertion point) - 1. The
insertion point is defined as the point at which the searched value would be inserted into the array: the index of the
first element greater than the searched value, or array length if all elements in the array are less than the specified
key. Note that this guarantees that the return value will be ≥ 0 if and only if the searched value is found.

```ts
binarySearch([10, 20, 30, 40], 20); // → 1

binarySearch([10, 20, 30, 40], 25); // → -3
```

### `sort`

Sorts the array in-place using an optional comparator and invokes a callback after a pair of elements was swapped.

```ts
sort(
    arr, // Mutable array that would be sorted
    (i, j) => {
      // Called when i and j elements of arr were swapped
      // Use this to sort multiple arrays in parallel
    },
    (a, b) => 0, // Comparator works the same way as in Array.sort
);
```

`sort` uses a non-recursive [Quicksort](https://en.wikipedia.org/wiki/Quicksort) algorithm. In contrast to
[`Array.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), `sort`
doesn't convert array elements to strings before comparison and uses comparison operators directly. So numeric arrays
are sorted in natural order with `sort(arr)`. You can provide an element comparator to change the sorting order.

`sort` is order of magnitude faster than `Array.sort` on both small and big arrays. The plot below uses a log scale and
shows the dependency of number of operations per second from the input array length.

<img alt="sort vs Array.sort performance comparison" src="https://github.com/smikhalevski/algomatic/raw/master/images/sort-perf.svg"/>

# Interpolation

### `lerp`

Creates a linear interpolator:

```ts
const f = lerp(xs, ys);
const y = f(x);
```

Here `xs` is the array of X coordinates of pivot points in ascending order, and `ys` is the array of corresponding Y
coordinates of pivot points.

### `cspline`

Creates
[a cubic spline interpolator](https://en.wikipedia.org/wiki/Spline_(mathematics)#Algorithm_for_computing_natural_cubic_splines)
for given pivot points:

```ts
const f = cspline(xs, ys);
const y = f(x);
```

More control over spline caching and computation:

```ts
// Pre-allocate an array of spline components that can be later reused
// to avoid excessive memory allocations
const splines = new Float32Array(xs.length * 3);

createCSplines(xs, ys, xs.length, splines); // → splines
// or
// const splines = createCSplines(xs, ys, xs.length); // → Float32Array

const y = interpolateCSpline(xs, ys, x, xs.length, splines);
```

### `csplineMonot`

Creates
[a monotone cubic interpolator](https://en.wikipedia.org/wiki/Monotone_cubic_interpolation) for given pivot points:

```ts
const f = csplineMonot(xs, ys);
const y = f(x);
```

Or using more fine-grained approach:

```ts
const y = interpolateCSplineMonot(xs, ys, x, xs.length, createCSplinesMonot(xs, ys, xs.length));
```

The plot below shows that `cspline` interpolation overshoots pivot points while `csplineMonot` provides monotonous
results.

<img alt="cspline and csplineMonot comparison" src="https://github.com/smikhalevski/algomatic/raw/master/images/cspline.svg"/>

# Bitwise

Utilities
[`int`](https://smikhalevski.github.io/algomatic/modules.html#int)
[`byte`](https://smikhalevski.github.io/algomatic/modules.html#byte)
[`uint`](https://smikhalevski.github.io/algomatic/modules.html#uint)

Bitwise operations [`left`](https://smikhalevski.github.io/algomatic/modules.html#left),
[`right`](https://smikhalevski.github.io/algomatic/modules.html#right),
[`and`](https://smikhalevski.github.io/algomatic/modules.html#and),
[`or`](https://smikhalevski.github.io/algomatic/modules.html#or)
and [`xor`](https://smikhalevski.github.io/algomatic/modules.html#xor) for _unsigned_ integers that exceed 32-bit range:

```ts
left(0xab, 8); // Same as 0xab << 8
// → 0xab_00 

left(0xab_cd_ef_ab_cd, 24)
// → 0xab_cd_ef_ab_cd_00_00_00

right(0xab_cd, 8); // Same as 0xab_cd >> 8
// → 0xab
```
