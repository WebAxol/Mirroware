const getContext = () => {

    const mockGL = new WebGL2RenderingContext();
    
    Object.assign(mockGL,
        {
            bufferData:    jest.fn(),
            createBuffer:  jest.fn().mockReturnValue(new WebGLBuffer()),
            createProgram: jest.fn().mockReturnValue(new WebGLProgram()),
            createShader:  jest.fn().mockImplementation((type : number) => {

                if(type === 1) return new WebGLShader();

            }),
            shaderSource:  jest.fn().mockImplementation((shader : WebGLShader ,source : string) => {

                if(!(shader instanceof WebGLShader)) return false;
                if(!source)                          return false;

                return true;
            }),
            compileShader:       jest.fn(),
            getShaderParameter : jest.fn().mockReturnValue(true),
            attachShader:        jest.fn().mockImplementation((program : WebGLProgram, shader : WebGLShader) => {
                
                if(!(program instanceof WebGLProgram)) return false;
                if(!(shader instanceof WebGLShader))   return false;
                
                return true;
            }),
            linkProgram:        jest.fn().mockImplementation((program : WebGLProgram) => {
                
                if(!(program instanceof WebGLProgram)) return false;
                
                return true;
            }),
            getProgramParameter     : jest.fn().mockReturnValue(true),
            deleteProgram           : jest.fn(),
            bindBuffer              : jest.fn(),
            bufferSubData           : jest.fn(),
            useProgram              : jest.fn(),
            getAttribLocation       : jest.fn(),
            vertexAttribPointer     : jest.fn(),
            enableVertexAttribArray : jest.fn(),

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