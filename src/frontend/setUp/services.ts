import RayCaster        from "../Services/RayCast/Orchestrator.js";
import SceneRenderer3D  from "../Services/3DRendering/Orchestrator.js";
import SceneRenderer2D  from "../Services/2DRendering/SceneRenderer2D.js";
import CameraMover      from "../Services/Camera/CameraMover.js";
import InputHandler     from "../Services/Camera/InputHandler.js";
import LightningEffects from '../Services/2DRendering/LightningEffects.js';
import RainEffect       from "../Services/2DRendering/RainEffect.js";
import canvases         from "./canvases.js";


const services = {
    'RayCastProcessor' : new RayCaster(),
    'SceneRenderer3D'  : new SceneRenderer3D(canvases.canvas3d),
    //'LightningEffects' : new LightningEffects(canvases.background),
    //'RainEffect'        : new RainEffect(canvases.frontground),
    'SceneRenderer2D'  : new SceneRenderer2D(canvases.canvas2d),
    'CameraMover'      : new CameraMover(),
    'InputHandler'     : new InputHandler()
};

export default services;