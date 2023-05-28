import { Ray } from '../setUp/agentTypes.js';
import SceneModel from './SceneModel.js';

class Camera{

    public pos         : { x : number, y : number };
    public wallIndices : { vertical : number, horizontal : number};
    public sceneModel  : SceneModel;
    public rays        : Ray[];

    constructor(pos){
        this.pos         = { x : pos.x || 0, y : pos.y || 0 };
        this.wallIndices = { horizontal : 0, vertical : 0 };
        this.sceneModel  = new SceneModel();
        this.rays        = [];
    }
}

const camera = new Camera({ x : 13, y : 13 });

export { Camera, camera };