import RayCastProcessor from "../Services/RayCast/RayCastProcessor.js";
import SceneRenderer3D from "../Services/Rendering/SceneRenderer3D.js";
import SceneRenderer2D from "../Services/Rendering/SceneRenderer2D.js";
import { canvas2d, canvas3d } from '../utils/canvas.js';
const services = {
    'RayCastProcessor': new RayCastProcessor(),
    'SceneRenderer3D': new SceneRenderer3D(canvas3d),
    'SceneRenderer2D': new SceneRenderer2D(canvas2d)
};
export default services;
