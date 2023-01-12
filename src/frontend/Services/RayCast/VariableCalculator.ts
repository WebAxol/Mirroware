import Service from "../Service.js";
import World from '/cases/World.js';

class VariableCalculator extends Service{

    #chief : Service;

    constructor(chief){
        super();
        this.#chief = chief;
    }

    public execute() {

        const raySources :any[] = this.#chief.world.getCollection('RaySources');

        raySources.forEach(raySource => {

            let rays = raySource.rays;

            // Input check

            if(typeof rays != 'object'){
                throw Error('Invalid ray array specified for raySource');
            }

            //

            rays.forEach(ray => {
                this.calculateRayProperties(raySource.pos,ray);
            });

            this.getIndicesOfClosestBefore(raySource);

        });

        return true;
    };

     // Get the index of the closest wall thea appears before the source in relation to an axis
     // WARNING - we are assuming that wall collections are properly sorted

    public getIndicesOfClosestBefore(source){


        // Defensive input check

        //

        const verticalWalls   = this.#chief.world.getCollection('VerticalWalls');
        const horizontalWalls = this.#chief.world.getCollection('HorizontalWalls');

        // get closest vertical wall's index before source - binary search

        let xPositions = verticalWalls.map((wall) =>  wall.posX );

        source.wallIndices.vertical  = this.BinarySearchForClosestSmaller(xPositions,source.pos.x);

        // get closest horizontal wall's index before source - binary search

        let yPositions = horizontalWalls.map((wall) =>  wall.posY );
        
        
        source.wallIndices.horizontal = this.BinarySearchForClosestSmaller(yPositions,source.pos.y);

    }

    public BinarySearchForClosestSmaller(arr : number[], value : number){

        // the closest smaller value will be the largest index that belongs to a value smaller to the given value

        let leftIndex       = 0;
        let rightIndex      = arr.length - 1; 
        let inBetweenIndex  = Math.ceil((leftIndex + rightIndex) / 2);
        let index = inBetweenIndex;
        let exec = 0;
        
        while(leftIndex < rightIndex && exec < 100){

            exec++;

            if(rightIndex == inBetweenIndex){
                index = rightIndex;
                break;
            }

            if(arr[inBetweenIndex] < value){
                leftIndex = inBetweenIndex;
            }
            else if(arr[inBetweenIndex] > value){
                rightIndex = inBetweenIndex;
                index = rightIndex;
            }

            else if(arr[inBetweenIndex] == value){
                index = inBetweenIndex;
                break;
            };
            
            inBetweenIndex  = Math.ceil((leftIndex + rightIndex) / 2);
   
        }

         while(arr[index] >= value){
             index--;
         }

        // Mechanism to avoid infinite loop issue

        if(exec >= 100) throw Error('Binary Search went out of control');
    
        return index;
    }

    public calculateRaySlope(ray) {

        // Input check

        if(typeof ray.slope != 'number' || typeof ray.degree != 'number'){ 
            throw Error('Invalid argument passed as ray');
        }

        //

        let degrees = ((ray.degree / 180) * Math.PI);
        ray.slope   = Math.sin(degrees) / Math.cos(degrees);
        
    }

    public calculateRayYIntercept(pos,ray){

        // Input check

        if(typeof ray.YIntercept != 'number'){
            throw Error('Invalid argument passed as ray');
        }

        //

        ray.YIntercept = pos.y - (ray.slope * pos.x);

    }

    public calculateDegreeFromSlope(ray){
        
    }

    public calculateRayEnding(pos,ray){    

        let degrees = ((ray.degree / 180) * Math.PI);

        ray.collidesAt.x = pos.x + Math.cos(degrees) * 500; 
        ray.collidesAt.y = pos.y + Math.sin(degrees) * 500;

    }
    
    calculateRayProperties(source,ray){

        if(ray.degree < 0) this.handleNegativeDegrees(ray);

        this.calculateRaySlope(ray);
        this.calculateRayYIntercept(source, ray);
        this.calculateRayEnding(source,ray);
    }

    public handleNegativeDegrees(ray){
        if(ray.degree < 0){
            ray.degree = Math.abs(ray.degree % -360) + 90;
        }
    }
}

export default VariableCalculator;