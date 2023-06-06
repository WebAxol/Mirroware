import Vector2D from '../utils/Vector2D.js';
const horizontalWallPrototype = {
    color: 'white',
    startX: NaN,
    endX: NaN,
    posY: NaN,
    opacity: 1
};
const verticalWallPrototype = {
    color: 'white',
    startY: NaN,
    endY: NaN,
    posX: NaN,
    opacity: 1
};
const rayPrototype = {
    active: true,
    source: {},
    reflected: {},
    level: 1,
    degree: NaN,
    slope: NaN,
    YIntercept: NaN,
    // for collision detection and response
    collidesWith: undefined,
    collidesAt: (new Vector2D(NaN, NaN)),
    wallIndices: { horizontal: NaN, vertical: NaN }
};
// Integrated agentTypes 
const agentTypes = {
    'HorizontalWall': { 'info': horizontalWallPrototype },
    'VerticalWall': { 'info': verticalWallPrototype, },
    'Ray': { 'info': rayPrototype }
};
export default agentTypes;
//# sourceMappingURL=agentTypes.js.map