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
    collidesAt : Object,
    collidesWith : Object,

    // Children nodes

    reflected  : Object,
    refracted  : Object

    // product/source duality - A ray has a source but can be the source of other ones

    wallIndices : Object
}

const rayPrototype :Ray = {
    active      : true,
    level       : 1,
    source      : {},
    degree      : NaN,
    slope       : NaN,
    YIntercept  : NaN,
    collidesAt  : { x : NaN, y : NaN},
    collidesWith: {},
    reflected   : {},
    refracted   : {},

    wallIndices : { 
        horizontal : NaN, 
        vertical   : NaN 
    }
}

// RaySource

interface RaySource{

    pos         : Object,
    rays        : Ray[],
    wallIndices : Object
};

const raySourcePrototype :RaySource = {
    pos  : { x : NaN, y : NaN },
    rays : [],

    wallIndices : { 
        horizontal : NaN, 
        vertical   : NaN 
    }
}


// Integrated agentTypes 

const agentTypes : Object = {

    'HorizontalWall' : {'info' : horizontalWallPrototype},
    'VerticalWall'   : {'info' : verticalWallPrototype, },
    'RaySource'      : {'info' : raySourcePrototype,       'collections' : ['RaySources']},
    'Ray'            : {'info' : rayPrototype}
};

export default agentTypes;

