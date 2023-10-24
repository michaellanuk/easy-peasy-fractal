const palette = [
    [9, 1, 47],         // Deep Blue
    [42, 3, 89],        // Dark Purple
    [74, 20, 140],      // Purple
    [106, 45, 168],     // Purple-Pink
    [138, 70, 175],     // Lavender
    [170, 97, 188],     // Lilac
    [202, 124, 201],    // Pink-Lilac
    [234, 152, 215],    // Light Pink
    [255, 182, 230],    // Soft Pink
    [255, 210, 245],    // Pale Pink
    [215, 170, 255],    // Pinkish Purple
    [255, 255, 255],
    [255, 219, 252],
    [250, 132, 240],
    [255, 102, 242],
    [255, 48, 237],
    [255, 41, 237],
    [182, 130, 255],    // Light Purple
    [149, 91, 255],     // Electric Purple
    [116, 52, 235]      // Deep Purple
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
