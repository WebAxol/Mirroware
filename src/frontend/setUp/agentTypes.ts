import Vector2D from '../utils/Vector2D.js';
// HorizontalWall

interface HorizontalWall {
    color  : string,
    startX : number,
    endX   : number,
    posY   : number,
    opacity: number
}

const horizontalWallPrototype :HorizontalWall = {
    color  : 'white',
    startX : NaN,
    endX   : NaN,
    posY   : NaN,
    opacity: 1
}

// VerticalWall

interface VerticalWall {
    color  : string,
    startY : number,
    endY   : number,
    posX   : number,
    opacity: number
}

const verticalWallPrototype :VerticalWall = {
    color  : 'white',
    startY : NaN,
    endY   : NaN,
    posX   : NaN,
    opacity: 1
}

// Ray

interface Ray {

    active     : boolean,
    level      : number,
    source     : Object,
    degree     : number,
    slope      : number,
    YIntercept : number,
    collidesAt : Vector2D,
    collidesWith : VerticalWall | HorizontalWall | undefined,
    reflected  : {} | Ray,

    // product/source duality - A ray has a source but can be the source of other ones

    wallIndices : { horizontal : number, vertical : number}
}

const rayPrototype :Ray = {
    active      : true,
    source      : {},
    reflected   : {},
    level       : 1,
    degree      : NaN,
    slope       : NaN,
    YIntercept  : NaN,

    // for collision detection and response

    collidesWith: undefined,
    collidesAt  : (new Vector2D(NaN,NaN)),
    wallIndices : { horizontal : NaN, vertical   : NaN }
}

// Integrated agentTypes 

const agentTypes : Object = {

    'HorizontalWall' : {'info' : horizontalWallPrototype},
    'VerticalWall'   : {'info' : verticalWallPrototype, },
    'Ray'            : {'info' : rayPrototype}
};

export { Ray, VerticalWall, HorizontalWall }
export default agentTypes;

