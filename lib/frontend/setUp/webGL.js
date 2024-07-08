import LocatorGL from "../utils/rendering/LocatorGL.js";
import BuilderGL from "../utils/rendering/BuilderGL.js";
import canvases from "./canvases.js";
const canvas = canvases.canvas3d;
const gl = canvas.getContext("webgl2");
const locatorPromise = new Promise(async (resolve, reject) => {
    const _locator = new LocatorGL();
    console.log("%cPreparing WebGL...", "color: skyblue");
    console.log('\x1b[36m', "building shaders...");
    const rectangleVertexShader = await BuilderGL.buildShader(gl, "VERTEX_SHADER", "./shaders/rect.vert");
    const frontFragmentShader = await BuilderGL.buildShader(gl, "FRAGMENT_SHADER", "./shaders/front.frag");
    const lyingFragmentShader = await BuilderGL.buildShader(gl, "FRAGMENT_SHADER", "./shaders/lying.frag");
    console.log("\n\n");
    console.log("%c[WebGL DEBUG]: shaders' status", "color : skyblue");
    console.table({
        rectangleVertexShader,
        frontFragmentShader,
        lyingFragmentShader
    });
    if (!rectangleVertexShader ||
        !frontFragmentShader ||
        !lyingFragmentShader)
        return reject("There was an error at building shaders");
    console.log('\x1b[36m', "building programs...");
    const frontProgram = BuilderGL.buildProgram(gl, rectangleVertexShader, frontFragmentShader);
    const lyingProgram = BuilderGL.buildProgram(gl, rectangleVertexShader, lyingFragmentShader);
    console.log("\n\n");
    console.log("%c[WebGL DEBUG]: programs' status", "color : skyblue");
    console.table({
        frontProgram,
        lyingProgram
    });
    if (!frontProgram || !lyingProgram)
        return reject("There was an error at building programs");
    console.log('\x1b[36m', "allocating programs...");
    _locator.registerProgram("front", frontProgram);
    _locator.registerProgram("lying", lyingProgram);
    console.log('\x1b[36m', "creating buffers...");
    gl.useProgram(frontProgram);
    const frontBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, frontBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(600 * 5 * 4), gl.DYNAMIC_DRAW);
    const frontElementBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, frontElementBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(600 * 3 * 2), gl.DYNAMIC_DRAW);
    gl.useProgram(lyingProgram);
    const lyingBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, lyingBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(600 * 3 * 8), gl.DYNAMIC_DRAW);
    const lyingElementBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lyingElementBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(600 * 3 * 4), gl.DYNAMIC_DRAW);
    if (!frontBuffer ||
        !frontElementBuffer ||
        !lyingBuffer ||
        !lyingElementBuffer)
        return reject("There was an error at creating buffers");
    console.log('\x1b[36m', "allocating buffers...");
    _locator.registerBuffer(frontBuffer, "ARRAY_BUFFER", "frontBuffer");
    _locator.registerBuffer(frontElementBuffer, "ELEMENT_ARRAY_BUFFER", "frontBuffer");
    _locator.registerBuffer(lyingBuffer, "ARRAY_BUFFER", "lyingBuffer");
    _locator.registerBuffer(lyingElementBuffer, "ELEMENT_ARRAY_BUFFER", "lyingBuffer");
    console.log("\n\n");
    console.log("%cWebGL was prepared successfully!", "color: lawngreen; background:black");
    gl.enable(gl.BLEND);
    return resolve(_locator);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
});
export { gl, locatorPromise };
//# sourceMappingURL=webGL.js.map