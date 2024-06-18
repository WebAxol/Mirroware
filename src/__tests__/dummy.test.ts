import RayCastProcessor from "./../frontend/Services/RayCast/RayCastProcessor.js";
import World from '/pluglightjs/World.js';

const service = new RayCastProcessor({});

test("import works", () => {

    expect(service).toBeTruthy();

    console.log(service);

});

/*
import data from "/pluglightjs/dummy.js";

test("import works", () => {

    expect(data).toBeTruthy();

    console.log(data);

});*/