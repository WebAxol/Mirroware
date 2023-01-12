// HorizontalWall
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
    level: 1,
    source: {},
    degree: NaN,
    slope: NaN,
    YIntercept: NaN,
    collidesAt: { x: NaN, y: NaN },
    collidesWith: {},
    reflected: {},
    refracted: {},
    wallIndices: {
        horizontal: NaN,
        vertical: NaN
    }
};
;
const raySourcePrototype = {
    pos: { x: NaN, y: NaN },
    rays: [],
    wallIndices: {
        horizontal: NaN,
        vertical: NaN
    }
};
// Integrated agentTypes 
const agentTypes = {
    'HorizontalWall': { 'info': horizontalWallPrototype },
    'VerticalWall': { 'info': verticalWallPrototype, },
    'RaySource': { 'info': raySourcePrototype, 'collections': ['RaySources'] },
    'Ray': { 'info': rayPrototype }
};
export default agentTypes;
