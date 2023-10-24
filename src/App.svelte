<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import { onMount } from 'svelte';

  let cX: number = -0.7;
  let cY: number = 0.27015;
  let worker: Worker;

  const draw = () => {
    const canvas = document.getElementById("fractalCanvas") as HTMLCanvasElement;
    worker.postMessage({ 
      width: canvas.width, 
      height: canvas.height, 
      cX: cX, 
      cY: cY 
    });
  }

  onMount(() => {
    worker = new Worker('/workers/fractalWorker.js');
    
    worker.onmessage = (event) => {
      const canvas = document.getElementById("fractalCanvas") as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.putImageData(event.data, 0, 0);
      }
    };

    draw();
  });
</script>

<main>
  <h1>Fractal Generator</h1>

  <p>Adjust Julia Set Parameters:</p>

  <label>
    cX: 
    <input type="number" bind:value={cX} min="-2" max="2" step="0.01" on:input={draw} />
    <input type="range" bind:value={cX} min="-2" max="2" step="0.01" on:change={draw} />
  </label>

  <label>
    cY: 
    <input type="number" bind:value={cY} min="-2" max="2" step="0.01" on:input={draw} />
    <input type="range" bind:value={cY} min="-2" max="2" step="0.01" on:change={draw} />
  </label>


  <div class="fractal">
      <canvas id="fractalCanvas" width="700" height="450"></canvas>
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
</style>
