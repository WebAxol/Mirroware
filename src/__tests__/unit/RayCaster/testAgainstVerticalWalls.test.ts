import RayCaster         from "./../../../frontend/Services/SceneRendering/RayCaster.js";
import CollisionDetector from "../../../frontend/utils/physics/CollisionDetector.js";
import Vector2D          from "../../../frontend/utils/physics/Vector2D.js";

describe("testAgainstVerticalWalls method", () => {

    it("must be a defined public method that receives two parameters", () => {

        const method = RayCaster.prototype.testAgainstVerticalWalls;
        expect(method).toBeTruthy();
        expect(method.length).toBe(2);
    });
});


const testRay = (x,y,hx,hy) => {
    return {
        source      : new Vector2D(x,y),
        direction   : new Vector2D(hx,hy)
    };
};

const testWall = (yi,yf,x, collides = false) => {
    return {
        startY : yi,
        endY   : yf,
        posX   : x,
        __mockCollides__: collides
    };
};

const testCases = [
    {
        ray   : testRay(0,0,1,1),
        index : 0,
        walls : [],
        res   : false
    },
    {
        ray   : testRay(-0.4,0.8,3,-1),
        index : 2,
        walls : [
            testWall(0.8,0.6,-1),
            testWall(0.8,0.4,-0.6),
            testWall(0.2,-0.2,-0.6),
            testWall(1,-0.2,0.2, true)
        ],
        res   : 2
    },
    {
        ray   : testRay(-0.4,0.8,-1,-1),
        index : 2,
        walls : [
            testWall(0.8,0.6,-1),
            testWall(0.8,0.4,-0.6, true),
            testWall(0.2,-0.2,-0.6),
            testWall(1,-0.2,0.2)
        ],
        res   : 1
    },
     {
        ray   : testRay(-1.5,0.6,-1,0),
        index : 2,
        walls : [
            testWall(0.8,0.6,-1, true),
            testWall(0.2,-0.2,-0.6),
            testWall(1.5,1,-0.5),
            testWall(1,-0.2,-2)
        ],
        res   : 0
    },
    {
        ray   : testRay(-1.5,0.6,1,0),
        index : 0,
        walls : [
            testWall(1,-0.2,-2),
            testWall(0.8,0.6,-1, true),
            testWall(0.2,-0.2,-0.6),
            testWall(1.5,1,-0.5),
        ],
        res   : 0
    },
];


var raycaster;

CollisionDetector.RayVsVerticalWall = jest.fn().mockImplementation((ray,wall) => { return wall.__mockCollides__ }); ;

RayCaster.prototype.compareWithClosest = jest.fn().mockReturnValue(true);

const func = (raycaster : RayCaster, case_ :any ) => { return raycaster.testAgainstVerticalWalls(case_.ray, case_.index) };

testCases.forEach((case_) => {

    test("That the method passes test cases", () => {

        const mockChief = { world : { getCollection : jest.fn().mockReturnValue(case_.walls) } };

        raycaster = new RayCaster(mockChief);

        expect(func(raycaster, case_)).toBe(case_.res);

    });
});