import LocatorGL from "../utils/rendering/LocatorGL.js";
import canvas3d  from "./canvases.js";

const gl :WebGL2RenderingContext = canvas3d.getContext("WebGL2");
const locator :LocatorGL = new LocatorGL();

const frontBuffer        :WebGLBuffer | null = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, frontBuffer);
gl.bufferData(gl.ARRAY_BUFFER, 1024, gl.DYNAMIC_DRAW);

const frontElementBuffer :WebGLBuffer | null = gl.createBuffer();

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, frontElementBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, 1024, gl.DYNAMIC_DRAW);

const lyingBuffer        :WebGLBuffer | null = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, lyingBuffer);
gl.bufferData(gl.ARRAY_BUFFER, 1024, gl.DYNAMIC_DRAW);

const lyingElementBuffer :WebGLBuffer | null = gl.createBuffer();

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lyingElementBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, 1024, gl.DYNAMIC_DRAW);

// Registration of buffers at locator for later usage

if(frontBuffer)         locator.registerBuffer(frontBuffer,"ARRAY_BUFFER","frontBuffer");
if(frontElementBuffer)  locator.registerBuffer(frontElementBuffer,"ELEMENT_ARRAY_BUFFER", "frontBuffer");

if(lyingBuffer)         locator.registerBuffer(lyingBuffer,"ARRAY_BUFFER","lyingBuffer");
if(lyingElementBuffer)  locator.registerBuffer(lyingElementBuffer,"ELEMENT_ARRAY_BUFFER", "lyingBuffer");

export { gl, locator };