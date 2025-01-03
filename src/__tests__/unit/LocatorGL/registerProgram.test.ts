import LocatorGL from "../../../utils/rendering/LocatorGL.js";

describe("registerProgram method", () => {

    const method = LocatorGL.prototype.registerProgram;

    it("must be a defined function that receives three parameters",() => {
        
        expect(method).toBeTruthy();
        expect(method.length).toBe(2);
    });

    const locator = new LocatorGL();

    var name, program;

    const func = () => { return locator.registerProgram(name, program) };


    it("must validate that the name is a non-empty string",() => {

        const err = Error("Invalid name: it must be a  non-empty string");

        name = 123;
        expect(func).toThrow(err);

        name = "";
        expect(func).toThrow(err);

        name = "valid name"         
        expect(func).not.toThrow(err);
    });

    it("must validate that the 'program' parameter is an instance of 'WebGLProgram'",() => {

        const err = Error("Invalid program: it must be an instance of 'WebGLProgram'");

        program = {};
        expect(func).toThrow(err)

        program = new WebGLProgram();
        
        // every parameter right up to this stage

        expect(func()).toBeTruthy();
    });

    it("must avoid registering program if it already exists", () => {

        const err = () => { return  Error(`Could not register program '${name}' because it already exists`) };

        expect(func).toThrow(err());
    });

});