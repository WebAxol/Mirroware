
// HorizontalWall

interface HorizontalWall {
    startX : number,
    endX   : number,
    posY   : number
}

const horizontalWallPrototype :HorizontalWall = {
    startX : NaN,
    endX   : NaN,
    posY   : NaN
}

// VerticalWall

interface VerticalWall {
    startY : number,
    endY   : number,
    posX   : number
}

const verticalWallPrototype :VerticalWall = {
    startY : NaN,
    endY   : NaN,
    posX   : NaN
}

// Ray

interface Ray {
    degree     : number,
    slope      : number,
    YIntercept : number,
    collisions : Object[],

    // Children nodes

    reflected  : Object,
    refracted  : Object

    // product/source duality - A ray has a source but can be the source of other ones

    wallIndices : Object
}

const rayPrototype :Ray = {
    degree      : NaN,
    slope       : NaN,
    YIntercept  : NaN,
    collisions  : [],
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
    'Ray'            : {'info' : rayPrototype,             'collections' : ['Rays']}
};

export default agentTypes;

