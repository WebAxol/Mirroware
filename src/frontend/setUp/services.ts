
import CameraMover          from "../Services/Camera/CameraMover.js";
import InputHandler         from "../Services/Camera/InputHandler.js";
import RenderingPipeline    from "../Services/SceneRendering/Orchestrator.js";
import SceneRenderer2D      from "../Services/2DRendering/SceneRenderer2D.js";
import canvases             from "./canvases.js";


const services = {
    'SceneRenderer2D'  : new SceneRenderer2D(canvases.canvas2d),
    'SceneRendering'   : new RenderingPipeline(),
    'CameraMover'      : new CameraMover(),
    'InputHandler'     : new InputHandler()
};


export default services;