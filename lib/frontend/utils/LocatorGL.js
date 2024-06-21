class LocatorGL {
    constructor() {
        this.arrayBuffers = new Map();
        this.elementArrayBuffers = new Map();
        this.programs = new Map();
    }
    __mapTypeToBufferLocation__(type) {
        const types = {
            "ARRAY_BUFFER": this.arrayBuffers,
            "ELEMENT_ARRAY_BUFFER": this.elementArrayBuffers
        };
        const location = types[type];
        if (!location)
            throw Error("Could not get buffer location: invalid buffer type");
        return location;
    }
    registerBuffer(buffer, type, name) {
        if (!(buffer instanceof WebGLBuffer))
            throw Error("Invalid buffer: it must be an instance of 'WebGLBuffer'");
        const location = this.__mapTypeToBufferLocation__(type);
        if (!location)
            return;
        if (typeof name !== "string" || !name)
            throw Error("Invalid name: it must be a  non-empty string");
        const exists = location.get(name);
        if (exists)
            throw Error(`Could not register buffer '${name}' as a buffer of type '${type}' because it already exists`);
        location.set(name, buffer);
        return true;
    }
    registerProgram(name, program) {
        if (typeof name !== "string" || !name)
            throw Error("Invalid name: it must be a  non-empty string");
        if (!(program instanceof WebGLProgram))
            throw Error("Invalid program: it must be an instance of 'WebGLProgram'");
        if (this.programs.get(name))
            throw Error(`Could not register program '${name}' because it already exists`);
        this.programs.set(name, program);
        return true;
    }
    getBuffer(type, name) {
        const location = this.__mapTypeToBufferLocation__(type);
        if (!location)
            return false;
        const buffer = location.get(name);
        return buffer ? buffer : false;
    }
    ;
}
export default LocatorGL;
//# sourceMappingURL=LocatorGL.js.map