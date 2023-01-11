import RayCastProcessor from "../Services/RayCast/RayCastProcessor.js";
import SceneRenderer2D from "../Services/Rendering/SceneRenderer2D.js";
import { context } from '../utils/canvas.js';


const services = {
    'RayCastProcessor' : new RayCastProcessor(),
    'SceneRenderer2D'  : new SceneRenderer2D(context)
};

export default services;