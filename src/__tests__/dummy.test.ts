import RayCastProcessor from "./../frontend/Services/RayCast/RayCastProcessor.js";

const service = new RayCastProcessor({});

test("import works", () => {

    expect(service).toBeTruthy();

    console.log(service);

});