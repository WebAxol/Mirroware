import LocatorGL from "./../../../frontend/utils/LocatorGL.js";

describe("registerBuffer method", () => {

    const method = LocatorGL.prototype.registerBuffer;

    it("must be a defined function that receives three parameters",() => {
        
        expect(method).toBeTruthy();
        expect(method.length).toBe(3);
    });

    const locator = new LocatorGL();

    var buffer,type,name;

    const func = () => { return locator.registerBuffer(buffer,type,name) };

    it("must validate that the 'buffer' parameter is an instance of 'WebGLBuffer'",() => {

        const err = Error("Invalid buffer: it must be an instance of 'WebGLBuffer'");

        buffer = {};
        expect(func).toThrow(err)

        buffer = new WebGLBuffer();
        expect(func).not.toThrow(err)
    });

    it("must validate that 'type' is a valid WebGL buffer type", () => {

        const err = Error("Could not get buffer location: invalid buffer type");

        type = "UNEXISTING_BUFFER_TYPE";
        expect(func).toThrow(err);

        type = "ARRAY_BUFFER";
        expect(func).not.toThrow(err);

        type = "ELEMENT_ARRAY_BUFFER";
        expect(func).not.toThrow(err);
    });

    it("must validate that the name is a non-empty string",() => {

        const err = Error("Invalid name: it must be a  non-empty string");

        name = 123;
        expect(func).toThrow(err);

        name = "";
        expect(func).toThrow(err);

        name = "valid name"         
        
        // Up to this stage every parameter is correct: expect buffer to be registered

        expect(func()).toBeTruthy();
    });

    it("must avoid registering a buffer if the name already exists for a buffer of the same type", () => {

        const err = () => { return Error(`Could not register buffer '${name}' as a buffer of type '${type}' because it already exists`) };

        expect(func).toThrow(err());
        
    });

});