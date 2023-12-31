import CollisionDetector from "mirroware/frontend/utils/CollisionDetector.js";

test("detect invalid arguments",() => {

    expect(CollisionDetector.RayVsVerticalLine(true,{})).toBe(false);
    expect(CollisionDetector.RayVsVerticalLine({},true)).toBe(false);
});

const testWalls = [
    { endY : 1000, startY :  0,    posX :  10 },
    { endY : 0,    startY : -1000, posX :  10 },
    { endY : 1000, startY : -1000, posX :  10 },
    { endY : 1000, startY :  0,    posX : -10 },
    { endY : 0,    startY : -1000, posX : -10 },
    { endY : 1000, startY : -1000, posX : -10 },
    { endY : 1000, startY :  1000, posX : -10 },

]

const testRays = [
    { YIntercept :  0, slope :  0   },
    { YIntercept :  1, slope :  0   },
    { YIntercept : -1, slope :  0   },
    { YIntercept :  0, slope :  0.1 },
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
        
            let obs = CollisionDetector.RayVsVerticalLine( testRays[ray], testWalls[wall] );
            let exp = expected[ray][wall];

            expect(obs).toEqual(exp);

        }
    }
});