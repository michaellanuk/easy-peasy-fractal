const palette = [
    [9, 1, 47],
    [4, 4, 73],
    [0, 7, 100],
    [12, 44, 138],
    [24, 82, 177],
    [57, 125, 209],
    [134, 181, 229],
    [211, 236, 248],
    [241, 233, 191],
    [248, 201, 95],
    [255, 170, 0],
    [204, 128, 0],
    [153, 87, 0],
    [106, 52, 3]
];

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

            if (iterations === maxIterations) {
                imageData.data[index] = 0;
                imageData.data[index + 1] = 0;
                imageData.data[index + 2] = 0;
                imageData.data[index + 3] = 255;
            } else {
                const colorIndex = iterations % palette.length;
                const [r, g, b] = palette[colorIndex];
                imageData.data[index] = r;
                imageData.data[index + 1] = g;
                imageData.data[index + 2] = b;
                imageData.data[index + 3] = 255;
            }
        }
    }

    self.postMessage(imageData);
};
