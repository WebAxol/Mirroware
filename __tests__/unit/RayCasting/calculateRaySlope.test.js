import VariableCalculator from "mirroware/frontend/Services/RayCast/VariableCalculator.js";
import Service            from "mirroware/frontend/Services/Service.js";

const service = new VariableCalculator(new Service());

const n = 16;
const testCases = [];
const refCases  = [];

for(let i = 0; i <= n; i++){

    let degrees = (360     / n)        * i;
    let radians = (Math.PI / (n / 2))  * i;

    testCases.push({ degree : degrees });

    refCases.push(radians);
}

const nearEqual = (a,b,delta = 0.0000001) => {

    return Math.abs(a - b) <= delta; 

};

test("calculate slope with angle in degrees", () => {

    const maxTreeshold = Math.pow(10,10); 

    for(let i = 0; i <= n; i++){

        let expected =  Math.tan(refCases[i]);
        let obtained = service.calculateRaySlope(testCases[i]);

        expect(obtained).not.toBe(NaN);

        expect(nearEqual(expected,obtained)).toBe(true);

        console.log(testCases[i]);
        
        if(
            testCases[i].degree == 0 ||  
            testCases[i].degree == 180

        ) expect(nearEqual(0,obtained)).toBe(true); // Zero slope
        
        else if(
            testCases[i].degree == 90 || 
            testCases[i].degree == 90 + 180

        ) expect(obtained > maxTreeshold).toBe(true); // Slope tends to infinite
    }

});


