
import CameraMover      from "../Services/Camera/CameraMover.js";
import InputHandler     from "../Services/Camera/InputHandler.js";
import RenderingPipeline from "../Services/SceneRendering/Orchestrator.js";
import canvases         from "./canvases.js";


const services = {
    'SceneRendering'  : new RenderingPipeline(),
    //'RayCastProcessor' : new RayCaster(),
    //'SceneRenderer3D'  : new SceneRenderer3D(canvases.canvas3d),
    //'SceneRenderer2D'  : new SceneRenderer2D(canvases.canvas2d),
    'CameraMover'      : new CameraMover(),
    'InputHandler'     : new InputHandler()
};

export default services;