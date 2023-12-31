import RayCastProcessor from "mirroware/frontend/Services/RayCast/RayCastProcessor.js";
import Service          from "mirroware/frontend/Services/Service.js";

const n = 300;
const service = new RayCastProcessor(new Service());

const testPoints = [];
const testStates = []; // Random current ray states


for(let i = 0; i < n; i++){

    let distance = Math.random() * 1000;

    let rayMod = Math.random() * distance; 
    let rayArg = Math.random() * Math.PI * 2;
    let rayPos =  { 
        x : rayMod * Math.cos(rayArg),
        y : rayMod * Math.sin(rayArg) 
    }

    let currentPointMod = Math.random() * distance + distance; 
    let currentPointArg = Math.random() * Math.PI * 2;

    let newPointMod     = Math.random() * distance; 
    let newPointArg     = Math.random() * Math.PI * 2;

    let newCollisionPoint = [
        rayPos.x + newPointMod * Math.cos(newPointArg),
        rayPos.y + newPointMod * Math.sin(newPointArg)
    ];

    let ray = {
        source : { pos : rayPos },

        collidesAt : {
            x : rayPos.x + currentPointMod * Math.cos(currentPointArg),
            y : rayPos.y + currentPointMod * Math.sin(currentPointArg)
        }
    };

    testPoints.push(newCollisionPoint);
    testStates.push(ray);

}

test("detects point closer than current", () => {
    
    for(let i = 0; i < n; i++){

        console.log("Case: ", i);

        let ray   = testStates[i];
        let point = testPoints[i];

        console.log(ray);
        console.log(point);

        let observed = service.compareWithClosest(ray,point);

        expect(observed).toBe(true);
    }
});