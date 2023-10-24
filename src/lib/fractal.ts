const drawJulia = (ctx: CanvasRenderingContext2D, width: number, height: number, cX: number = -0.7, cY: number = 0.27015) => {
    const maxIterations = 1000;
    const magnificationFactor = 200;
    const panX = 0;
    const panY = 0;

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let zx = (x - width / 2) / magnificationFactor + panX;
            let zy = (y - height / 2) / magnificationFactor + panY;
            let iterations = 0;

            while ((zx * zx + zy * zy) < 4 && iterations < maxIterations) {
                const temp = zx * zx - zy * zy + cX;
                zy = 2.0 * zx * zy + cY;
                zx = temp;
                iterations++;
            }

            const color = iterations === maxIterations ? "#000" : `rgb(${iterations % 255}, ${iterations % 255}, ${iterations % 255})`;
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

export { drawJulia };
