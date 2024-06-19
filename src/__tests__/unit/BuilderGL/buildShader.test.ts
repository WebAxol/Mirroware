import BuilderGL from "./../../../frontend/utils/BuilderGL.js";
import getContext from '../../__mocks__/getContext';

BuilderGL.loadShaderSource = jest.fn().mockReturnValue("mock shader source");

beforeEach(() => {
    jest.clearAllMocks();
});

describe("buildShader method", () => {

    var gl, type, url;

    const func = async () => { return await BuilderGL.buildShader(gl,type,url); };

    it("must validate the 'gl' parameter", () => {

        const err = Error("The 'gl' parameter must be an instance of 'WebGL2RenderingContext'");

        gl = {}
        expect(func).rejects.toThrow(err);

        gl = getContext();
        expect(func).rejects.not.toThrow(err);

    });
    
    it("must validate type as being a valid shader type (either FRAGMENT_SHADER or VERTEX_SHADER)", () => {
    
        const err = () => { return Error(`Invalid shader type '${type}'; the type must be either  FRAGMENT_SHADER or VERTEX_SHADER`) };

        type = "INVALID_TYPE";
        expect(func()).rejects.toThrow(err());

        type = "FRAGMENT_SHADER";
        expect(func()).rejects.not.toThrow(err());

        type = "VERTEX_SHADER";
        expect(func()).rejects.not.toThrow(err());;
    });
    

    it("must use the resource from the given 'url' argument as text to compile the shader (whenever the url exists)", () => {

        const err = Error("Invalid 'url' argument: it must be a non-empty string");

        url = "";
        expect(func()).rejects.toThrow(err);

        url = "../../../../public/shaders/sceneWalls.frag";

        func().then((res) => {

            expect(gl.createShader).toHaveBeenCalledTimes(1);
            expect(gl.createShader).toHaveReturnedWith(new WebGLShader());
            expect(gl.shaderSource).toHaveBeenCalledTimes(1);
            expect(gl.shaderSource).toHaveReturnedWith(true);
            expect(gl.compileShader).toHaveBeenCalledTimes(1);

            expect(res).toBeInstanceOf(WebGLShader);
        });

    });

});