<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import { onMount } from "svelte";

  import { vertexShaderSource } from "./shaders/vertex.ts";
  import fragmentShaderSources from "./shaders/fragment.ts";

  let cX: number = -0.7;
  let cY: number = 0.27015;
  let panX = 0.0;
  let panY = 0.0;
  let zoom = 0.4;
  let gl: WebGLRenderingContext;
  let program: WebGLProgram;
  let positionBuffer: WebGLBuffer;
  let fractalType = "julia";
  let fragmentShaderSource: string = fragmentShaderSources[fractalType];

  const createShader = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader));
    }
    return shader;
  };

  const setupGL = () => {
    const canvas = document.getElementById(
      "fractalCanvas"
    ) as HTMLCanvasElement;

    gl = canvas.getContext("webgl");
    if (!gl) throw new Error("WebGL not supported");

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program));
    }

    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1, -1, 1, -1, -1, 1, 1, 1];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  };

  onMount(() => {
    setupGL();
    draw();
  });

  const draw = () => {
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    if (fractalType === "julia") {
      const u_resolution = gl.getUniformLocation(program, "u_resolution");
      const u_c = gl.getUniformLocation(program, "u_c");
      gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height);
      gl.uniform2f(u_c, cX, cY);
    } else if (fractalType === "mandelbrot") {
      const u_resolution = gl.getUniformLocation(program, "u_resolution");
      const u_pan = gl.getUniformLocation(program, "u_pan");
      const u_zoom = gl.getUniformLocation(program, "u_zoom");
      gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height);
      gl.uniform2f(u_pan, panX, panY);
      gl.uniform1f(u_zoom, zoom);
    }

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  const switchFractal = (type) => {
    fractalType = type;
    fragmentShaderSource = fragmentShaderSources[fractalType];
    setupGL();
    draw();
  };
</script>

<main>
  <h1>Fractal Generator</h1>

  <button class="button" on:click={() => switchFractal("julia")}
    >Julia Set</button
  >
  <button class="button" on:click={() => switchFractal("mandelbrot")}
    >Mandelbrot Set</button
  >

  {#if fractalType === "julia"}
    <p>Adjust Julia Set Parameters:</p>

    <label>
      cX:
      <input
        type="number"
        bind:value={cX}
        min="-2"
        max="2"
        step="0.01"
        on:input={draw}
      />
      <input
        type="range"
        bind:value={cX}
        min="-2"
        max="2"
        step="0.01"
        on:input={draw}
      />
    </label>

    <label>
      cY:
      <input
        type="number"
        bind:value={cY}
        min="-2"
        max="2"
        step="0.01"
        on:input={draw}
      />
      <input
        type="range"
        bind:value={cY}
        min="-2"
        max="2"
        step="0.01"
        on:input={draw}
      />
    </label>
  {:else}
    <p>Adjust Mandelbrot Set Parameters:</p>

    <label>
      Pan X:
      <input
        type="number"
        bind:value={panX}
        min="-2"
        max="2"
        step="0.01"
        on:input={draw}
      />
      <input
        type="range"
        bind:value={panX}
        min="-2"
        max="2"
        step="0.01"
        on:input={draw}
      />
    </label>

    <label>
      Pan Y:
      <input
        type="number"
        bind:value={panY}
        min="-2"
        max="2"
        step="0.01"
        on:input={draw}
      />
      <input
        type="range"
        bind:value={panY}
        min="-2"
        max="2"
        step="0.01"
        on:input={draw}
      />
    </label>

    <label>
      Zoom:
      <input
        type="number"
        bind:value={zoom}
        min="0.1"
        max="15"
        step="0.01"
        on:input={draw}
      />
      <input
        type="range"
        bind:value={zoom}
        min="0.1"
        max="15"
        step="0.01"
        on:input={draw}
      />
    </label>
  {/if}

  <div class="fractal">
    <canvas id="fractalCanvas" width="1000" height="500" />
  </div>

  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <p>Built with Vite + Svelte</p>
</main>

<style>
  .logo {
    height: 3em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 1em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 1em #ff3e00aa);
  }
  .fractal {
    border: 1px solid white;
    margin: 20px;
    display: flex;
    justify-content: center;
  }
  .button {
    border: none;
    outline: none;
    transition: 0s;
  }
  .button:hover {
    background-color: aqua;
    color: black;
    transition: all 0.3s ease-in-out;
  }
</style>
