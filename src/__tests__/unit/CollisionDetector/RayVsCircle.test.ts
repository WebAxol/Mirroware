import CollisionDetector from "../../../frontend/utils/physics/CollisionDetector.js";
import Vector2D from "../../../frontend/utils/physics/Vector2D.js";


describe("RayVsCircle method", () => {

    it("must be a defined static method that takes two parameters", () => {

        const method = CollisionDetector.RayVsCircle;
        expect(method).toBeTruthy();
        expect(method.length).toBe(2);
    });
});

const testRay = (x :number ,y :number ,hx :number ,hy :number ) => {

    return {
        source      :  new Vector2D(x,y),
        direction   : (new Vector2D(hx,hy)).normalize()
    };
};

const testCircle = (x :number ,y :number ,radius :number ) => {
    return {
        center: new Vector2D(x,y),
        radius: radius 
    };
};

const testCases = [
    {
        ray    : testRay(0,0,0.5,-0.2),
        circle : testCircle(3.5,-2.5,1.8),
        res    : { 
            point  : new Vector2D(2.5,-1),
            lambda : 2.69 
        }
    },
    {
        ray    : testRay(0,0,-0.5, 0.2),
        circle : testCircle(3.5,-2.5,1.8),
        res    : false
    },
    {
        ray    : testRay(3.5,1.5,-1.5, -1),
        circle : testCircle(0.8,1,1.3),
        res    : { 
            point  : new Vector2D(2,0.5),
            lambda : 1.8
        }
    },
    {
        ray    : testRay(-7,-3,1,0),
        circle : testCircle(-3,-3,2),
        res    : { 
            point  : new Vector2D(-5,-3),
            lambda : 2
        }
    },
    {
        ray    : testRay(1.5,3,0,-1),
        circle : testCircle(0,0,2),
        res    : { 
            point  : new Vector2D(1.5,1.32),
            lambda : 1.67
        }
    },
    {
        ray    : testRay(1.5,3,-1,-2.05),
        circle : testCircle(0,0,0.04),
        res    : { 
            point  : new Vector2D(0.049,0.01),
            lambda : 3.33
        }
    },
    {
        ray    : testRay(2,2,-2,1),
        circle : testCircle(1,2,1.64),
        res    : false
    },

];


test("that collisions are detected correctly", () => {

    const func = (testCase) => { return CollisionDetector.RayVsCircle(testCase.ray,testCase.circle) };

    testCases.forEach((testCase : any) => {

        const res :any = func(testCase);
        const tolerance = 0.01;

        expect(() => { func(testCase) }).not.toThrow(Error);

        if(testCase.res){
            expect(Math.abs(res.point.x - testCase.res.point.x)).toBeLessThan(tolerance);
            expect(Math.abs(res.point.y - testCase.res.point.y)).toBeLessThan(tolerance);
            expect(Math.abs(res.lambda  - testCase.res.lambda )).toBeLessThan(tolerance);
        }
        else
            expect(res).toBe(false);
    });
});