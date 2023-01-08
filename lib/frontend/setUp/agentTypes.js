// Interfaces
;
// Prototypes (default attributes)
const horizontalWallPrototype = {
    startX: NaN,
    endX: NaN,
    posY: NaN
};
const verticalWallPrototype = {
    startX: NaN,
    endX: NaN,
    posY: NaN
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
    'HorizontalWall': { 'info': horizontalWallPrototype, 'collections': ['HorizontalWalls'] },
    'VerticalWall': { 'info': verticalWallPrototype, 'collections': ['VerticalWalls'] },
    'RaySource': { 'info': raySourcePrototype, 'collections': ['RaySources'] },
    'Ray': { 'info': rayPrototype, 'collections': ['Rays'] }
};
export default agentTypes;
