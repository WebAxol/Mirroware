import BuilderGL from "../../../frontend/utils/rendering/BuilderGL.js";
import getContext from '../../__mocks__/getContext';

beforeEach(() => {
    jest.clearAllMocks();
});

describe("buildProgram", () => {
    
    var gl, vertexShader, fragmentShader;

    const func = () => { return BuilderGL.buildProgram(gl,vertexShader, fragmentShader); };

    it("must validate the 'gl' parameter", () => {

        const err = Error("The 'gl' parameter must be an instance of 'WebGL2RenderingContext'");

        gl = {}
        expect(func).toThrow(err);

        gl = getContext();
        expect(func).not.toThrow(err);
    });

    it("must validate vertex shader", () => {

        const err =  Error("Invalid vertex shader: it must be an instance of 'WebGLShader'");

        vertexShader = {};
        expect(func).toThrow(err);

        vertexShader = new WebGLShader();
        expect(func).not.toThrow(err);
    });

    it("must validate fragment shader", () => {

        const err =  Error("Invalid fragment shader: it must be an instance of 'WebGLShader'");

        fragmentShader = {};
        expect(func).toThrow(err);

        fragmentShader = new WebGLShader();
        expect(func).not.toThrow(err);
    });

    it("must return an instance of WebGLProgram", () => {

        expect(func()).toBeInstanceOf(WebGLProgram);
        expect(gl.attachShader).toHaveBeenCalledTimes(2);
        expect(gl.attachShader).toHaveReturnedWith(true);
        expect(gl.linkProgram).toHaveReturnedWith(true);
    });
});