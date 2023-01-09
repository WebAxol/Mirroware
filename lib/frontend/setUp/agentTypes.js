// Interfaces
;
// Prototypes (default attributes)
const horizontalWallPrototype = {
    startX: NaN,
    endX: NaN,
    posY: NaN
};
const verticalWallPrototype = {
    startY: NaN,
    endY: NaN,
    posX: NaN
};
const rayPrototype = {
    degree: NaN,
    slope: NaN,
    YIntercept: NaN,
    collisions: [],
    reflected: {},
    refracted: {}
};
const raySourcePrototype = {
    pos: { x: NaN, y: NaN },
    rays: [],
    degree: NaN
};
// Integrated agentTypes 
const agentTypes = {
    'HorizontalWall': { 'info': horizontalWallPrototype },
    'VerticalWall': { 'info': verticalWallPrototype, },
    'RaySource': { 'info': raySourcePrototype, 'collections': ['RaySources'] },
    'Ray': { 'info': rayPrototype, 'collections': ['Rays'] }
};
export default agentTypes;
