const getContext = () => {

    const mockGL = new WebGL2RenderingContext();
    
    Object.assign(mockGL,
        {
            bufferData:    jest.fn(),
            createBuffer:  jest.fn().mockReturnValue(new WebGLBuffer()),
            createShader:  jest.fn().mockImplementation((type) => {

                if(type === 1) return new WebGLShader();

            }),
            shaderSource:  jest.fn().mockImplementation((shader,source) => {

                if(!(shader instanceof WebGLShader)) return false;
                if(!source)                          return false;

                return true;
            }),
            compileShader:       jest.fn(),
            getShaderParameter : jest.fn().mockReturnValue(true),
            bindBuffer:          jest.fn(),
            bufferSubData:       jest.fn(),

            FRAGMENT_SHADER : 1,
            VERTEX_SHADER   : 1,
            ARRAY_BUFFER    : 1,
            DYNAMIC_DRAW    : 1,
            STATIC_DRAW     : 1
        }
    );
    
    return mockGL;
};

export default getContext;