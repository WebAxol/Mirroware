import CollisionDetector from "../../../utils/physics/CollisionDetector.js";
import Vector2D from "../../../utils/physics/Vector2D.js";


describe("RayVsVerticalWall method", () => {

    it("must be a defined static method that takes two parameters", () => {

        const method = CollisionDetector.RayVsVerticalWall;
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
        startY : xi,
        endY   : xf,
        posX   : y
    };
};

const testCases = [
    {
        ray  : testRay(0.6,0.2,1,0),
        wall : testWall(0,0.4,1.4),
        res  : new Vector2D(1.4,0.2)
    },
    {
        ray  : testRay(0.6,0.2,1,0),
        wall : testWall(0,0.4,-1.4),
        res  : false
    },
    {
        ray  : testRay(-1.4,0.4,1,-1),
        wall : testWall(-0.8,-0.4,-0.4),
        res  : new Vector2D(-0.4,-0.6)
    },
    {
        ray  : testRay(0.4,-0.2,-4,-1),
        wall : testWall(-0.8,-0.4,-0.4),
        res  : new Vector2D(-0.4,-0.4)
    },
];

test("that collisions are detected correctly", () => {

    const func = (testCase) => { return CollisionDetector.RayVsVerticalWall(testCase.ray,testCase.wall) };

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