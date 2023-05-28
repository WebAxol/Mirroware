import SceneModel from './SceneModel.js';
class Camera {
    constructor(pos) {
        this.pos = { x: pos.x || 0, y: pos.y || 0 };
        this.wallIndices = { horizontal: 0, vertical: 0 };
        this.sceneModel = new SceneModel();
        this.rays = [];
    }
}
const camera = new Camera({ x: 13, y: 13 });
export { Camera, camera };
