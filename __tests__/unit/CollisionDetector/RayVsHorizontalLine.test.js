import CollisionDetector from "mirroware/frontend/utils/CollisionDetector.js";

test("detect invalid arguments",() => {

    expect(CollisionDetector.RayVsVerticalLine(true,{})).toBe(false);
    expect(CollisionDetector.RayVsVerticalLine({},true)).toBe(false);
});

const testWalls = [
    { endX : 1000, startX :  0,    posY :  10 },
    { endX : 0,    startX : -1000, posY :  10 },
    { endX : 1000, startX : -1000, posY :  10 },
    { endX : 1000, startX :  0,    posY : -10 },
    { endX : 0,    startX : -1000, posY : -10 },
    { endX : 1000, startX : -1000, posY : -10 },
    { endX : 1000, startX :  1000, posY : -10 },

]

const testRays = [
    { YIntercept :  0, slope :  1000 },
    { YIntercept :  1, slope :  Infinity },
    { YIntercept : -1, slope :  Infinity },
    { YIntercept :  0, slope :  1000     },
];

const expected = [

    [  false, false,  [10,0 ], false,  false,   [-10,0 ],false ],
    [  [10,1],false,  [10,1 ], [-10,1],false,   [-10,1 ],false ],
    [  false, [10,-1],[10,-1], false, [-10,-1], [-10,-1],false ],
    [  [10,1],false,  [10,1] , false, [-10,-1], [-10,-1],false ],
];


test("detect collision against wall", () => {
    
    for(let ray in testRays){

        for(let wall in testWalls){

            console.log('case',ray,wall);
        
            let obs = CollisionDetector.RayVsVerticalLine( testRays[ray], testWalls[wall] );
            let exp = expected[ray][wall];

            expect(obs).toEqual(exp);

        }
    }
});