import Service      from "../Service.js";
import { Camera }   from "./../../../frontend/utils/scene/Camera.js";

class SpaceSearcher extends Service {

    #chief;
    
    constructor(chief){
        super();
        this.#chief = chief;
    }

    public execute() {}
    
    public getIndicesOfClosest(source :Camera, testArgs :any = undefined ) :object | false {

        const verticalWalls   = (testArgs && testArgs.vertical  ) ? testArgs.vertical   : this.world.getCollection('VerticalWalls');
        const horizontalWalls = (testArgs && testArgs.horizontal) ? testArgs.horizontal : this.world.getCollection('HorizontalWalls');

        // get closest vertical wall's index before source

        let xPositions = verticalWalls.map((wall) =>  wall.posX );

        source.wallIndices.vertical  = this.BinarySearchForClosest(xPositions,source.pos.x);

        // get closest horizontal wall's index before source

        let yPositions = horizontalWalls.map((wall) =>  wall.posY );
        
        source.wallIndices.horizontal = this.BinarySearchForClosest(yPositions,source.pos.y);

        return source.wallIndices;
    }

    public BinarySearchForClosest(arr : number[], value : number) :number {

        if(arr.length <= 0) return -1;

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
        
        // Mechanism to avoid infinite loop issue (just in unexpected edge case)

        if(exec >= 100) throw Error('Binary Search went out of control');
    
        return index;
    }
}

export default SpaceSearcher;