const juliaShaderSource = `
    precision mediump float;
    uniform vec2 u_resolution;
    uniform vec2 u_c;

    vec3 getColor(float iter) {
        float r = 0.5 + 0.5 * cos(3.0 + iter * 0.15);
        float g = 0.5 + 0.5 * cos(3.0 + iter * 0.15 + 2.0);
        float b = 0.5 + 0.5 * cos(3.0 + iter * 0.15 + 4.0);
        return vec3(r, g, b);
    }

    void main() {
        vec2 z = (gl_FragCoord.xy - u_resolution * 0.5) / min(u_resolution.x, u_resolution.y);
        vec2 c = u_c;

        int iterations = 0;
        for(int i=0; i<100; i++) {
            iterations = i;
            z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + c;
            if(dot(z, z) > 4.0) break;
        }

        float smoothColor = float(iterations) - log(log(length(z))) / log(2.0);
        vec3 color = getColor(smoothColor);
        gl_FragColor = vec4(color, 1.0);
    }
`;

const mandelbrotShaderSource = `
    precision mediump float;
    uniform vec2 u_resolution;
    uniform vec2 u_pan;
    uniform float u_zoom;

    vec3 getColor(float iter) {
        float r = 0.5 + 0.5 * cos(3.0 + iter * 0.15);
        float g = 0.5 + 0.5 * cos(3.0 + iter * 0.15 + 2.0);
        float b = 0.5 + 0.5 * cos(3.0 + iter * 0.15 + 4.0);
        return vec3(r, g, b);
    }

    void main() {
        vec2 normalizedCoord = (gl_FragCoord.xy - u_resolution * 0.5) / min(u_resolution.x, u_resolution.y);
        vec2 z = vec2(0.0, 0.0);
        vec2 c = u_pan + normalizedCoord / u_zoom;

        int iterations = 0;
        for(int i = 0; i < 100; i++) {
            iterations = i;
            z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + c;
            if(dot(z, z) > 4.0) break;
        }

        float smoothColor = float(iterations) - log(log(length(z))) / log(2.0);
        vec3 color = getColor(smoothColor);
        gl_FragColor = vec4(color, 1.0);
    }
`;

export default {
    julia: juliaShaderSource,
    mandelbrot: mandelbrotShaderSource,
}
