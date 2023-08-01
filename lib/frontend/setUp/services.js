import RayCaster from "../Services/RayCast/Orchestrator.js";
import SceneRenderer3D from "../Services/Rendering/3DRendering/Orchestrator.js";
import CameraMover from "../Services/Camera/CameraMover.js";
import InputHandler from "../Services/Camera/InputHandler.js";
import LightningEffects from '../Services/Rendering/2DRendering/LightningEffects.js';
import canvases from "./canvases.js";
const services = {
    'RayCastProcessor': new RayCaster(),
    'SceneRenderer3D': new SceneRenderer3D(canvases.canvas3d),
    'LightningEffects': new LightningEffects(canvases.background),
    //'SceneRenderer2D'  : new SceneRenderer2D(canvas2d),
    'CameraMover': new CameraMover(),
    'InputHandler': new InputHandler()
};
export default services;
//# sourceMappingURL=services.js.map