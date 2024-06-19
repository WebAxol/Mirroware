class BuilderGL {

    public static async loadShaderSource(url : string) : Promise<string | undefined> {
        
        console.info('Loading shader source',url);

        const res =  await fetch(url);

        return res.text();

    }

    public static async buildShader(gl : WebGL2RenderingContext, type : string, url : string) : Promise<void | WebGLShader> {

        if(!(gl instanceof WebGL2RenderingContext)) throw Error("The 'gl' parameter must be an instance of 'WebGL2RenderingContext'");

        const shaderTypes = {
            "FRAGMENT_SHADER" : gl.FRAGMENT_SHADER,
            "VERTEX_SHADER"   : gl.VERTEX_SHADER
        };

        const _type = shaderTypes[type];

        if(_type === undefined)                     throw Error(`Invalid shader type '${type}'; the type must be either  FRAGMENT_SHADER or VERTEX_SHADER`);

        if(typeof url !== 'string' || url == "")    throw Error("Invalid 'url' argument: it must be a non-empty string");

        const source : string | undefined = await this.loadShaderSource(url);
        
        const shader : WebGLShader | null = gl.createShader(_type);
        
        if(!source || !shader) return;

        gl.shaderSource(shader, source);

        gl.compileShader(shader);

        const success = gl.getShaderParameter(shader,gl.COMPILE_STATUS);

        if(success) return shader;
    };
}

export default BuilderGL;