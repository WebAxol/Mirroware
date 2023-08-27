import Service from "../Service.js";
import { Camera, camera } from '../../utils/Camera.js';
import { Ray } from '../../types/Ray.js';

class VariableCalculator extends Service{

    protected chief : Service;

    constructor(chief){
        super();
        this.chief = chief;
    }

    public execute() {

        let rays :Ray[] = camera.rays;

        rays.forEach((ray :Ray) => {
            this.calculateRayProperties(camera.pos,ray);
        });

        this.getIndicesOfClosestBefore(camera);

        return true;
    };

     // Get the index of the closest wall thea appears before the source in relation to an axis
     // WARNING - we are assuming that wall collections are properly sorted

    public getIndicesOfClosestBefore(source :Camera){

        const verticalWalls   = this.chief.world.getCollection('VerticalWalls');
        const horizontalWalls = this.chief.world.getCollection('HorizontalWalls');

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

         while(arr[index] >= value) index--;
         
        // Mechanism to avoid infinite loop issue (just in extreme edge case)

        if(exec >= 100) throw Error('Binary Search went out of control');
    
        return index;
    }

    public calculateRaySlope(ray :Ray) {
        let degrees = ((ray.degree / 180) * Math.PI);
        ray.slope   = Math.sin(degrees) / Math.cos(degrees);
    }

    public calculateRayYIntercept(pos :{ x : number, y :number},ray :Ray){
        ray.YIntercept = pos.y - (ray.slope * pos.x);
    }

    public calculateRayEnding(pos :{ x : number, y :number},ray :Ray){    

        let degrees = ((ray.degree / 180) * Math.PI);

        ray.collidesAt.x = pos.x + Math.cos(degrees) * 500; 
        ray.collidesAt.y = pos.y + Math.sin(degrees) * 500;

    }
    
    public calculateRayProperties(source :{ x : number, y :number} ,ray :Ray){

        if(ray.degree < 0) this.handleNegativeDegrees(ray);

        this.calculateRaySlope(ray);
        this.calculateRayYIntercept(source, ray);
        this.calculateRayEnding(source,ray);
    }

    public handleNegativeDegrees(ray :Ray){
        if(ray.degree < 0){
            ray.degree = Math.abs(ray.degree % -360) + 90;
        }
    }
}

export default VariableCalculator;