import CameraMover from "../Services/Camera/CameraMover.js";
import InputHandler from "../Services/Camera/InputHandler.js";
import RenderingPipeline from "../Services/SceneRendering/Orchestrator.js";
const services = {
    'SceneRendering': new RenderingPipeline(),
    'CameraMover': new CameraMover(),
    'InputHandler': new InputHandler()
};
export default services;
//# sourceMappingURL=services.js.map