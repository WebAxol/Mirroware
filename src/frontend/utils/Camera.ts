import { Ray }      from '../types/Ray.js';
import SceneModel   from './SceneModel.js';
import Vector2D     from './Vector2D.js';

class Camera{

    public pos         : Vector2D;
    public wallIndices : { vertical : number, horizontal : number};
    public sceneModel  : SceneModel;
    public rays        : Ray[];

    constructor(pos){
        this.wallIndices = { horizontal : 0, vertical : 0 };
        this.pos         = new Vector2D( pos.x || 0, pos.y || 0 );
        this.sceneModel  = new SceneModel();
        this.rays        = [];
    }
}

const camera = new Camera({ x : 13, y : 13 });

export { Camera, camera };