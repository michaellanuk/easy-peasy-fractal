# Easy Peasy Fractal

A simple fractal generator built with JavaScript, HTML5 Canvas, and web workers, plus Vite and Vercel for deployment.

## Fractals and the Julia Set

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