import Service from "../Service.js";
import { camera } from '../../utils/Camera.js';
class VariableCalculator extends Service {
    constructor(chief) {
        super();
        this.chief = chief;
    }
    execute() {
        let rays = camera.rays;
        rays.forEach((ray) => {
            this.calculateRayProperties(camera.pos, ray);
        });
        this.getIndicesOfClosestBefore(camera);
        return true;
    }
    ;
    // Get the index of the closest wall thea appears before the source in relation to an axis
    // WARNING - we are assuming that wall collections are properly sorted
    getIndicesOfClosestBefore(source) {
        const verticalWalls = this.chief.world.getCollection('VerticalWalls');
        const horizontalWalls = this.chief.world.getCollection('HorizontalWalls');
        // get closest vertical wall's index before source - binary search
        let xPositions = verticalWalls.map((wall) => wall.posX);
        source.wallIndices.vertical = this.BinarySearchForClosestSmaller(xPositions, source.pos.x);
        // get closest horizontal wall's index before source - binary search
        let yPositions = horizontalWalls.map((wall) => wall.posY);
        source.wallIndices.horizontal = this.BinarySearchForClosestSmaller(yPositions, source.pos.y);
    }
    BinarySearchForClosestSmaller(arr, value) {
        // the closest smaller value will be the largest index that belongs to a value smaller to the given value
        let leftIndex = 0;
        let rightIndex = arr.length - 1;
        let inBetweenIndex = Math.ceil((leftIndex + rightIndex) / 2);
        let index = inBetweenIndex;
        let exec = 0;
        while (leftIndex < rightIndex && exec < 100) {
            exec++;
            if (rightIndex == inBetweenIndex) {
                index = rightIndex;
                break;
            }
            if (arr[inBetweenIndex] < value) {
                leftIndex = inBetweenIndex;
            }
            else if (arr[inBetweenIndex] > value) {
                rightIndex = inBetweenIndex;
                index = rightIndex;
            }
            else if (arr[inBetweenIndex] == value) {
                index = inBetweenIndex;
                break;
            }
            ;
            inBetweenIndex = Math.ceil((leftIndex + rightIndex) / 2);
        }
        while (arr[index] >= value)
            index--;
        // Mechanism to avoid infinite loop issue (just in extreme edge case)
        if (exec >= 100)
            throw Error('Binary Search went out of control');
        return index;
    }
    calculateRaySlope(ray) {
        let degrees = ((ray.degree / 180) * Math.PI);
        ray.slope = Math.sin(degrees) / Math.cos(degrees);
    }
    calculateRayYIntercept(pos, ray) {
        ray.YIntercept = pos.y - (ray.slope * pos.x);
    }
    calculateRayEnding(pos, ray) {
        let degrees = ((ray.degree / 180) * Math.PI);
        ray.collidesAt.x = pos.x + Math.cos(degrees) * 500;
        ray.collidesAt.y = pos.y + Math.sin(degrees) * 500;
    }
    calculateRayProperties(source, ray) {
        if (ray.degree < 0)
            this.handleNegativeDegrees(ray);
        this.calculateRaySlope(ray);
        this.calculateRayYIntercept(source, ray);
        this.calculateRayEnding(source, ray);
    }
    handleNegativeDegrees(ray) {
        if (ray.degree < 0) {
            ray.degree = Math.abs(ray.degree % -360) + 90;
        }
    }
}
export default VariableCalculator;
