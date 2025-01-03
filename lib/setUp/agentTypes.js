import { horizontalWallPrototype } from "../types/HorizontalWall.js";
import { verticalWallPrototype } from "../types/VerticalWall.js";
import { rayPrototype } from "../types/Ray.js";
import { circlePrototype } from "../types/Circle.js";
import { SceneChunkPrototype } from "../types/SceneChunk.js";
const agentTypes = {
    'HorizontalWall': { 'info': horizontalWallPrototype },
    'VerticalWall': { 'info': verticalWallPrototype, },
    'Circle': { 'info': circlePrototype },
    'Ray': { 'info': rayPrototype },
    'SceneChunk': { 'info': SceneChunkPrototype }
};
export default agentTypes;
//# sourceMappingURL=agentTypes.js.map