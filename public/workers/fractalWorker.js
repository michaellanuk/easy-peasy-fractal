self.onmessage = function(event) {
    const { width, height, cX, cY } = event.data;
    const maxIterations = 1000;
    const magnificationFactor = 200;
    const panX = 0;
    const panY = 0;

    const imageData = new ImageData(width, height);

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

            const index = (y * width + x) * 4; 
            const colorValue = iterations === maxIterations ? 0 : iterations % 255;
            imageData.data[index] = colorValue;
            imageData.data[index + 1] = colorValue;
            imageData.data[index + 2] = colorValue;
            imageData.data[index + 3] = 255;
        }
    }

    self.postMessage(imageData);
};
