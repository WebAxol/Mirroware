import LocatorGL from "../../../utils/rendering/LocatorGL.js";

const locator = new LocatorGL();

// Prepare test buffers

const n = 2;
const buffers = [  new WebGLBuffer(),  new WebGLBuffer()];
const names   = [ "bufferOne", "bufferTwo" ];
const types   = ["ELEMENT_ARRAY_BUFFER", "ARRAY_BUFFER" ];

test("that test buffers are registered correctly", () => {
    
    var i;

    const func = () => { return locator.registerBuffer(buffers[i], types[i], names[i]) };

    for(i = 0; i < n; i++){

        expect(func()).toBeTruthy();
    };
});

describe("getBuffer method", () => {

    it("must be a defined function that receives two parameters",() => {
        
        const method = LocatorGL.prototype.getBuffer;

        expect(method).toBeTruthy();
        expect(method.length).toBe(2);
    });

    var type,name;

    const func = () => { return locator.getBuffer(type,name) };

    it("must validate that 'type' is a valid WebGL buffer type", () => {

        const err = Error("Could not get buffer location: invalid buffer type");

        type = "UNEXISTING_BUFFER_TYPE";
        expect(func).toThrow(err);

        type = "ARRAY_BUFFER";
        expect(func).not.toThrow(err);

        type = "ELEMENT_ARRAY_BUFFER";
        expect(func).not.toThrow(err);
    });

    it("must return the exact reference of the registered buffer when both type and name match", () => {
    
        for(var i = 0; i < n; i++){

            type = types[i];
            name = names[i];
    
            let receivedBuffer = func();
            let expectedBuffer = buffers[i];

            expect(receivedBuffer).toBe(expectedBuffer);
        };
    });
});