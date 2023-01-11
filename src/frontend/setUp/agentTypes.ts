// HorizontalWall

interface HorizontalWall {
    startX : number,
    endX   : number,
    posY   : number,
    isMirror : boolean
}

const horizontalWallPrototype :HorizontalWall = {
    startX : NaN,
    endX   : NaN,
    posY   : NaN,
    isMirror : false
}

// VerticalWall

interface VerticalWall {
    startY : number,
    endY   : number,
    posX   : number,
    isMirror : boolean
}

const verticalWallPrototype :VerticalWall = {
    startY : NaN,
    endY   : NaN,
    posX   : NaN,
    isMirror : false
}

// Ray

interface Ray {
    active     : boolean,
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

