import Service      from "../Service.js";
import { Camera }   from "../../utils/scene/Camera.js";

class SpaceSearcher extends Service {

    #chief;
    
    constructor(chief){
        super();
        this.#chief = chief;
    }

    public execute() {}
    
    public getIndicesOfClosest(camera :Camera) :{ horizontal: number, vertical : number } {

        const verticalWalls   = this.#chief.world.getCollection('VerticalWalls');
        const horizontalWalls = this.#chief.world.getCollection('HorizontalWalls');
        const wallIndices     = { horizontal : -1, vertical : -1 };

        // get closest vertical wall's index before source

        if(verticalWalls.length > 0){

            let xPositions = verticalWalls.map((wall) =>  wall.posX );

            wallIndices.vertical  = this.BinarySearchForClosest(xPositions,camera.pos.x);

        }

        // get closest horizontal wall's index before source

        if(horizontalWalls.length > 0){

            let yPositions = horizontalWalls.map((wall) =>  wall.posY );
            
            wallIndices.horizontal = this.BinarySearchForClosest(yPositions,camera.pos.y);
        
        }

        return wallIndices;
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