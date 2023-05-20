import RayCastProcessor from "../Services/RayCast/RayCastProcessor.js";
import SceneRenderer3D from "../Services/Rendering/3DRendering/Orchestrator.js";
import SceneRenderer2D from "../Services/Rendering/2DRendering/SceneRenderer2D.js";
import CameraMover     from "../Services/Camera/CameraMover.js";
import InputHandler    from "../Services/Camera/InputHandler.js";
import { canvas2d,canvas3d } from '../utils/canvas.js';


const services = {
    'RayCastProcessor' : new RayCastProcessor(),
    'SceneRenderer3D'  : new SceneRenderer3D(canvas3d),
    'SceneRenderer2D'  : new SceneRenderer2D(canvas2d),
    'CameraMover'      : new CameraMover(),
    'InputHandler'     : new InputHandler()
};

export default services;