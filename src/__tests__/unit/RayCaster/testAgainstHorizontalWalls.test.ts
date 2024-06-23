import RayCaster         from "./../../../frontend/Services/SceneRendering/RayCaster.js";
import CollisionDetector from "../../../frontend/utils/physics/CollisionDetector.js";
import Vector2D          from "../../../frontend/utils/physics/Vector2D.js";

describe("testAgainstHorizontalWalls method", () => {

    it("must be a defined public method that receives two parameters", () => {

        const method = RayCaster.prototype.testAgainstHorizontalWalls;
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

const testWall = (xi,xf,y, collides = false) => {
    return {
        startX : xi,
        endX   : xf,
        posY   : y,
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
        ray   : testRay(0.4,-0.2,-2,3),
        index : -1,
        walls : [
            testWall(0.2,0.4,0.4),
            testWall(-0.6,0.4,0.6, true),
            testWall(-0.6,0.4,0.7)
        ],
        res   : 0
    },
    {
        ray   : testRay(0.4,-0.2,-2,3),
        index : 0,
        walls : [
            testWall(-0.6,0.4,-0.4),
            testWall(0.2,0.4,0.4),
            testWall(-0.6,0.4,0.6, true),
        ],
        res   : 1
    },
    {
        ray   : testRay(0.4,-0.2,-2,3),
        index : 0,
        walls : [
            testWall(-0.6,0.4,-0.4),
            testWall(0.2,0.4,0.4),
            testWall(-0.6,0.4,0.6, true),
        ],
        res   : 1
    },
    {
        ray   : testRay(0.2,0.8,2,-3),
        index : 2,
        walls : [
            testWall(0.4,1.6,-0.2, true),
            testWall(-0.2,0.4,0.4),
            testWall(0.6,1.8,0.4),
            testWall(-0.2,1,1),
        ],
        res   : 0
    },
    {
        ray   : testRay(1,0.8,-2,-3),
        index : 2,
        walls : [
            testWall(0.4,1.6,-0.2),
            testWall(-0.2,0.4,0.4),
            testWall(0.6,1.8,0.4, true),
            testWall(-0.2,1,1),
        ],
        res   : 2
    }
];


var raycaster;

CollisionDetector.RayVsHorizontalWall = jest.fn().mockImplementation((ray,wall) => { return wall.__mockCollides__ }); ;

RayCaster.prototype.compareWithClosest = jest.fn().mockReturnValue(true);

const func = (raycaster : RayCaster, case_ :any ) => { return raycaster.testAgainstHorizontalWalls(case_.ray, case_.index) };

testCases.forEach((case_) => {

    test("That the method passes test cases", () => {

        const mockChief = { world : { getCollection : jest.fn().mockReturnValue(case_.walls) } };

        raycaster = new RayCaster(mockChief);

        expect(func(raycaster, case_)).toBe(case_.res);

    });
});