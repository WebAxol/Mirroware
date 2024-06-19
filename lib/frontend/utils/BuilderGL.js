class BuilderGL {
    static async loadShaderSource(url) {
        console.info('Loading shader source', url);
        const res = await fetch(url);
        return res.text();
    }
    static async buildShader(gl, type, url) {
        if (!(gl instanceof WebGL2RenderingContext))
            throw Error("The 'gl' parameter must be an instance of 'WebGL2RenderingContext'");
        const shaderTypes = {
            "FRAGMENT_SHADER": gl.FRAGMENT_SHADER,
            "VERTEX_SHADER": gl.VERTEX_SHADER
        };
        const _type = shaderTypes[type];
        if (_type === undefined)
            throw Error(`Invalid shader type '${type}'; the type must be either  FRAGMENT_SHADER or VERTEX_SHADER`);
        if (typeof url !== 'string' || url == "")
            throw Error("Invalid 'url' argument: it must be a non-empty string");
        const source = await this.loadShaderSource(url);
        const shader = gl.createShader(_type);
        if (!source || !shader)
            return;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success)
            return shader;
    }
    ;
    static buildProgram(gl, vertexShader, fragmentShader) {
        if (!(gl instanceof WebGL2RenderingContext))
            throw Error("The 'gl' parameter must be an instance of 'WebGL2RenderingContext'");
        if (!(vertexShader instanceof WebGLShader))
            throw Error("Invalid vertex shader: it must be an instance of 'WebGLShader'");
        if (!(fragmentShader instanceof WebGLShader))
            throw Error("Invalid fragment shader: it must be an instance of 'WebGLShader'");
        var program;
        program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        const success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success)
            return program;
        gl.deleteProgram(program);
    }
}
export default BuilderGL;
//# sourceMappingURL=BuilderGL.js.map