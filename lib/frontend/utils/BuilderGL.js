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
        return shader;
    }
    ;
}
export default BuilderGL;
//# sourceMappingURL=BuilderGL.js.map