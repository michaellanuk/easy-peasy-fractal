# Easy Peasy Fractal

A simple fractal generator built with JavaScript, WebGL shaders, and Svelte, plus Vite and Vercel for deployment.

https://easy-peasy-fractal.vercel.app/

## Fractals

### The Mandelbrot Set

The Mandelbrot set is the set obtained from the quadratic recurrence equation
$$
    z_{n + 1} = z^2_n + c
$$

with $z_0 = c$, where points $c$ in the complex plane for which the orbit of $z_n$ does not tend to infinity are in the set.

### The Julia Set

The Julia Set is derived from the behavior of complex numbers when repeatedly applied to a function. For a given complex function $f(z)$, the Julia Set is the set of complex numbers such that the iterations remain bounded.

For a complex number, $z$ the sequence defined by
$$
    z_{n + 1} = f(z_n)
$$

is considered. If this sequence does not tend to infinity, then $z$ is in the Julia Set for that function.

This exploration pertains specifically to the quadratic function:
$$
    f(z) = z^2 + c
$$

where $c$ is a constant complex number. Different values for $c$ produce difference Julia Sets.

## Example

### Mandelbrot Set

![Mandelbrot Set](/public/mandelbrot-sample.png)
![Mandelbrot Set](/public/mandelbrot-sample-2.png)

### Julia Set samples

![Julia Set 1](/public/julia-sample-1.png)
![Julia Set 3](/public/julia-sample-3.png)
![Julia Set 2](/public/julia-sample-2.png)
![Julia Set 4](/public/julia-sample-4.png)

## Installation and usage

1. Clone
```shell
git clone https://github.com/michaellanuk/easy-peasy-fractal.git
```

2. Change directory
```shell
cd easy-peasy-fractal
```

3. Install dependencies
```shell
npm i
```

4. Run
```shell
npm run dev
```
