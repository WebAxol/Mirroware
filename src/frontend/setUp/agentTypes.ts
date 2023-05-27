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
    collidesAt : { x : number, y : number},
    collidesWith : VerticalWall | HorizontalWall | undefined,

    // Children nodes

    reflected  : {} | Ray,
    refracted  : {} | Ray,

    // product/source duality - A ray has a source but can be the source of other ones

    wallIndices : { horizontal : number, vertical : number}
}

const rayPrototype :Ray = {
    active      : true,
    level       : 1,
    source      : {},
    degree      : NaN,
    slope       : NaN,
    YIntercept  : NaN,
    collidesAt  : { x : NaN, y : NaN},
    collidesWith: undefined,
    reflected   : {},
    refracted   : {},
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

