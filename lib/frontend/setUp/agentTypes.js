// HorizontalWall
const horizontalWallPrototype = {
    startX: NaN,
    endX: NaN,
    posY: NaN,
    isMirror: false
};
const verticalWallPrototype = {
    startY: NaN,
    endY: NaN,
    posX: NaN,
    isMirror: false
};
const rayPrototype = {
    active: true,
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
