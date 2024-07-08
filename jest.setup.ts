import getContext from "./src/__tests__/__mocks__/getContext.js";

global.WebGLBuffer  = class MockGLBuffer{};
global.WebGLShader  = class MockGLShader{};
global.WebGLProgram = class MockGLProgram{};

global.fetch = jest.fn().mockImplementation((url) => {
    
    return { text : () => { return "not-empty" } };
});

(global as any).WebGL2RenderingContext = class WebGL2RenderingContext {};

(HTMLCanvasElement as any).prototype.getContext = getContext;


