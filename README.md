# numeric-wrench 🔧 [![build](https://github.com/smikhalevski/numeric-wrench/actions/workflows/master.yml/badge.svg?branch=master&event=push)](https://github.com/smikhalevski/numeric-wrench/actions/workflows/master.yml)

Number manipulation and math functions.

```shell
npm install --save-prod numeric-wrench
```

⚠️ [API documentation is available here.](https://smikhalevski.github.io/numeric-wrench/)

# Usage

### `cspline` / `csplineMonot`

Returns a cubic spline interpolation function for given pivot points:

```ts
const f = cspline(xs, ys);
const y = f(x);
```

More control over spline caching and computation:

```ts
const y = interpolateCSpline(
    xs, // The array of X coordinates of pivot points in ascending order
    ys, // The array of corresponding Y coordinates of pivot points
    x,  // The X coordinate of interpolated point
    xs.length, // The number of pivot points to use
    createCSplines(xs, ys, xs.length), // The array of spline components
);
```

Values produced by `cspline` aren't guaranteed to be monotonous and not [overshoot](https://en.wikipedia.org/wiki/Overshoot_(signal)) the pivot points.

To prevent overshooting, use `csplineMonot`:

```ts
const f = csplineMonot(xs, ys);
const y = f(x);
```

Or interpolate using more fine-grained approach:

```ts
const y = interpolateCSplineMonot(xs, ys, x, createCSplinesMonot(xs, ys, xs.length));
```

`cspline` and `csplineMonot` interpolation comparison:

<a href="https://en.wikipedia.org/wiki/Monotone_cubic_interpolation">
  <img width="400" src="./images/cspline.png"/>
</a>
