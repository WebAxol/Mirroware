import VariableCalculator from "mirroware/frontend/Services/RayCast/RayCalculator.js";
import Service            from "mirroware/frontend/Services/Service.js";

const service = new VariableCalculator(new Service());

// * Known cases

const playerStates = [

    { pos : { x : 5,   y : 5   }, wallIndices : { vertical : NaN, horizontal : NaN } },
    { pos : { x : 1.5, y : 1.5 }, wallIndices : { vertical : NaN, horizontal : NaN } },
    { pos : { x : 1,   y : 1   }, wallIndices : { vertical : NaN, horizontal : NaN } },
    { pos : { x : -10, y : -10 }, wallIndices : { vertical : NaN, horizontal : NaN } },
    { pos : { x : -10, y : 2   }, wallIndices : { vertical : NaN, horizontal : NaN } },
    { pos : { x : 15, y  : 15  }, wallIndices : { vertical : NaN, horizontal : NaN } },
];

const environments = [

    { // Case Null - No Walls

        horizontal : [],
        vertical   : [],
    },

    {
        horizontal :  [
            { startX : 0, endX : 10, posY : -5 },
        ],
        vertical   :  [
            { startY : 0, endY : 10, posX : 5  },
        ]    
    },

    {
        horizontal :  [
            { startX : 0, endX : 10, posY : -5 },
            { startX : 0, endX : 10, posY : 1  },
            { startX : 0, endX : 10, posY : 2  },
        ],
        vertical   :  [
            { startY : 0, endY : 10, posX : -5 },
            { startY : 0, endY : 10, posX : 1  },
            { startY : 0, endY : 10, posX : 2  },
        ]    
    },
    {
        horizontal :  [
            { startX : 0, endX : 10, posY : -5 },
            { startX : 0, endX : 10, posY : 1  },
            { startX : 0, endX : 10, posY : 1  },
            { startX : 0, endX : 10, posY : 2  },
            { startX : 0, endX : 10, posY : 3  },
            { startX : 0, endX : 10, posY : 4  },
            { startX : 0, endX : 10, posY : 24 },
        ],
        vertical   :  [
            { startY : 0, endY : 10, posX : -11},
            { startY : 0, endY : 10, posX : 1  },
            { startY : 0, endY : 10, posX : 1  },
            { startY : 0, endY : 10, posX : 2  },
            { startY : 0, endY : 10, posX : 3  },
            { startY : 0, endY : 10, posX : 4  },
        ]    
    }
];

const expected = [

    [ 
        { vertical : -1, horizontal : -1 },
        { vertical : -1, horizontal : -1 },
        { vertical : -1, horizontal : -1 },
        { vertical : -1, horizontal : -1 }, 
        { vertical : -1, horizontal : -1 },
        { vertical : -1, horizontal : -1 },              
    ],
    [
        { vertical :-1, horizontal : 0 },
        { vertical :-1, horizontal : 0 },
        { vertical :-1, horizontal : 0 },
        { vertical :-1, horizontal : -1 },
        { vertical :-1, horizontal : 0 },
        { vertical : 0, horizontal : 0 },

    ],
    [ 
        { vertical : 2 , horizontal :  2 }, 
        { vertical : 1 , horizontal :  1 },
        { vertical : 0 , horizontal :  0 },
        { vertical : -1, horizontal : -1 },
        { vertical : -1, horizontal :  1 },
        { vertical :  2, horizontal :  2 },        
    ],
    [ 
        { vertical : 5 , horizontal :  5 }, 
        { vertical : 2 , horizontal :  2 },
        { vertical : 0 , horizontal :  0 },
        { vertical : 0 , horizontal : -1 },
        { vertical : 0 , horizontal :  2 },
        { vertical : 5,  horizontal :  5 },                
    ]

];

// Reference O(n) algorithm

const _getIndicesOfClosest = (source, env) => {

    let xPositions = env.vertical.map((wall) =>  wall.posX );

    let yPositions = env.horizontal.map((wall) =>  wall.posY );

    var xIndex = -1, yIndex = -1;

    for(let i of xPositions){

        if(i < source.pos.x) xIndex++;

        else break;
    }

    for(let i of yPositions){

        if(i < source.pos.y) yIndex++;
        
        else break;
    }

    return { vertical : xIndex, horizontal : yIndex };

};


test("property get nearest walls at known manually built cases",() => {
    
    for(let env in environments){

        for(let state in playerStates){

            //console.log("Case ",env,state);
    
            let expectedRes = expected[env][state]; 
            let testEnv = environments[env];
            let testState = playerStates[state];

            expect(_getIndicesOfClosest(testState,testEnv)).toEqual(expectedRes);
        
            expect(service.getIndicesOfClosest(testState,testEnv)).toEqual(expectedRes);

        }
    };
});


// * Random cases

const n = 10;
const generatedPlayerStates = []; 
const generatedEnvironments = [];

const randInt = (min,max) => {

    return Math.round(min + Math.random() * (max - min));
}

for(let i = 0; i < n; i++){
    let state = { pos : { x : randInt(-50,50), y : randInt(-50,50)}, wallIndices : { vertical : NaN, horizontal : NaN } };
    
    generatedPlayerStates.push(state);
}

for(let i = 0; i < n; i++){
    let env = {
        horizontal : [],
        vertical   : []
    }

    for(let j = 0; j < 1000; j++){

        if(Math.random() < 0.5){ 
            env.horizontal.push( { 
                startX : randInt(-1000000,1000000),
                endX   : randInt(-1000000,1000000),
                posY   : randInt(-1000000,1000000)
            });
        }
        if(Math.random() < 0.5){
            env.vertical.push( { 
                startY : randInt(-1000000,1000000),
                endY   : randInt(-1000000,1000000),
                posX   : randInt(-1000000,1000000)
            });
        }
    }

    env.horizontal.sort((a, b) => {return a.posY - b.posY});
    env.vertical.sort(  (a, b) => {return a.posX - b.posX});

    generatedEnvironments.push(env);
}


test("property get nearest walls at randomly built cases",() => {
    
    for(let env in generatedEnvironments){

        for(let state in generatedPlayerStates){

            //console.log("Random Case ",env,state);
    
            let testEnv = generatedEnvironments[env];
            let testState = generatedPlayerStates[state];

            let reference = _getIndicesOfClosest(testState,testEnv); 
            let tested    = service.getIndicesOfClosest(testState,testEnv);

            //console.log(tested);

            expect(tested).toEqual(reference);
        }
    };
});
