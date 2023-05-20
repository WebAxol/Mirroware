var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _VariableCalculator_chief;
import Service from "../Service.js";
import { camera } from '../../utils/Camera.js';
class VariableCalculator extends Service {
    constructor(chief) {
        super();
        _VariableCalculator_chief.set(this, void 0);
        __classPrivateFieldSet(this, _VariableCalculator_chief, chief, "f");
    }
    execute() {
        let rays = camera.rays;
        // Input check
        if (typeof rays != 'object') {
            throw Error('Invalid ray array specified for raySource');
        }
        //
        rays.forEach(ray => {
            this.calculateRayProperties(camera.pos, ray);
        });
        this.getIndicesOfClosestBefore(camera);
        return true;
    }
    ;
    // Get the index of the closest wall thea appears before the source in relation to an axis
    // WARNING - we are assuming that wall collections are properly sorted
    getIndicesOfClosestBefore(source) {
        // Defensive input check
        //
        const verticalWalls = __classPrivateFieldGet(this, _VariableCalculator_chief, "f").world.getCollection('VerticalWalls');
        const horizontalWalls = __classPrivateFieldGet(this, _VariableCalculator_chief, "f").world.getCollection('HorizontalWalls');
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
        while (arr[index] >= value) {
            index--;
        }
        // Mechanism to avoid infinite loop issue (just in extreme edge case)
        if (exec >= 100)
            throw Error('Binary Search went out of control');
        return index;
    }
    calculateRaySlope(ray) {
        // Input check
        if (typeof ray.slope != 'number' || typeof ray.degree != 'number') {
            throw Error('Invalid argument passed as ray');
        }
        //
        let degrees = ((ray.degree / 180) * Math.PI);
        ray.slope = Math.sin(degrees) / Math.cos(degrees);
    }
    calculateRayYIntercept(pos, ray) {
        // Input check
        if (typeof ray.YIntercept != 'number') {
            throw Error('Invalid argument passed as ray');
        }
        //
        ray.YIntercept = pos.y - (ray.slope * pos.x);
    }
    calculateDegreeFromSlope(ray) {
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
_VariableCalculator_chief = new WeakMap();
export default VariableCalculator;
