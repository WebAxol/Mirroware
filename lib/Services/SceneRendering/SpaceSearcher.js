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
var _SpaceSearcher_chief;
import Service from "../Service.js";
class SpaceSearcher extends Service {
    constructor(chief) {
        super();
        _SpaceSearcher_chief.set(this, void 0);
        __classPrivateFieldSet(this, _SpaceSearcher_chief, chief, "f");
    }
    execute() { }
    getIndicesOfClosest(camera) {
        const verticalWalls = __classPrivateFieldGet(this, _SpaceSearcher_chief, "f").world.getCollection('VerticalWalls');
        const horizontalWalls = __classPrivateFieldGet(this, _SpaceSearcher_chief, "f").world.getCollection('HorizontalWalls');
        const wallIndices = { horizontal: -1, vertical: -1 };
        if (verticalWalls.length > 0) {
            let xPositions = verticalWalls.map((wall) => wall.posX);
            wallIndices.vertical = this.BinarySearchForClosest(xPositions, camera.pos.x);
        }
        if (horizontalWalls.length > 0) {
            let yPositions = horizontalWalls.map((wall) => wall.posY);
            wallIndices.horizontal = this.BinarySearchForClosest(yPositions, camera.pos.y);
        }
        return wallIndices;
    }
    BinarySearchForClosest(arr, value) {
        if (arr.length <= 0)
            return -1;
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
        if (exec >= 100)
            throw Error('Binary Search went out of control');
        return index;
    }
}
_SpaceSearcher_chief = new WeakMap();
export default SpaceSearcher;
//# sourceMappingURL=SpaceSearcher.js.map