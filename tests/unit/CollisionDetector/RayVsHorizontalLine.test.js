"use strict";

import CollisionDectector from "../../../lib/frontend/utils/CollisionDetector.js";

var ray = {
    b : 4,
    slope : 2
};

var line  = {
    startX : 2,
    endX   : 10,
    posY   : 8
};

for(let i = -400; i >= -12.00 ; i-= 1 / 100){

    ray.b = i;

    let collisionTest =  CollisionDectector.RayVsHorizontalLine(ray,line);

    // Fixed slope but variable Y-intercept

    test('porperly calculates a group of feasable Ray vs horizontal Line interceptions', () => {

        expect(typeof collisionTest).toEqual('object');
    
    });
}

/* 
Missing tests:
    - Fixed Y-intercept but variable slope with known range of feasable cases
    - Variable slope and Y-intercept  with known range of feasable cases
*/