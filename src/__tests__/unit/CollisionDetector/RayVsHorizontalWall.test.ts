import CollisionDetector from "../../../frontend/utils/physics/CollisionDetector.js";
import Vector2D from "../../../frontend/utils/physics/Vector2D.js";


describe("RayVsHorizontalWall method", () => {

    it("must be a defined static method that takes two parameters", () => {

        const method = CollisionDetector.RayVsHorizontalWall;
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

const testWall = (xi,xf,y) => {
    return {
        startX : xi,
        endX   : xf,
        posY   : y
    };
};

const testCases = [
    {
        ray  : testRay(0,0,1,2),
        wall : testWall(-4,4,1),
        res  : new Vector2D(0.5,1)
    },
    {
        ray  : testRay(-1,0,2,1),
        wall : testWall(0.5,1.5,1),
        res  : new Vector2D(1,1)
    },
    {
        ray  : testRay(-1,0,1,0.5),
        wall : testWall(-2.5,-1.5,-0.5),
        res  : false
    },
    {
        ray  : testRay(-0.5,-0.5,-3,-1),
        wall : testWall(-3,-2,-1),
        res  : new Vector2D(-2,-1)
    },
    {
        ray  : testRay(-3.5,-2,4,2),
        wall : testWall(-2.8,-2,-1.5),
        res  : new Vector2D(-2.5,-1.5)
    },
    {
        ray  : testRay(0.4,1,0,-1.2),
        wall : testWall(0.2,0.6,-0.2),
        res  : new Vector2D(0.4,-0.2)
    },
    {
        ray  : testRay(0.4,-1,0, 1.2),
        wall : testWall(0.2,0.6,-0.2),
        res  : new Vector2D(0.4,-0.2)
    },
    {
        ray  : testRay(0.2,0.8,1, 0),
        wall : testWall(1.4,1.8,0.8),
        res  : false
    }
];


test("that collisions are detected correctly", () => {

    const func = (testCase) => { return CollisionDetector.RayVsHorizontalWall(testCase.ray,testCase.wall) };

    testCases.forEach((testCase : any) => {

        const res :any = func(testCase);
        const tolerance = 0.0000001;


        if(testCase.res){
            expect(Math.abs(res.x - testCase.res.x)).toBeLessThan(tolerance);
            expect(Math.abs(res.y - testCase.res.y)).toBeLessThan(tolerance);
        }
        else
            expect(res).toBe(false);
    });
});