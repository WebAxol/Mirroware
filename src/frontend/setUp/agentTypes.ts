
// Interfaces

interface HorizontalWall {
    startX : number,
    endX   : number,
    posY   : number
}

interface VerticalWall {
    startY : number,
    endY   : number,
    posX   : number
}

interface Ray {
    degree     : number,
    slope      : number,
    YIntercept : number,
    collisions : Object[],
    reflected  : Object,
    refracted  : Object

}

interface RaySource{
    pos     : Object,
    rays    : Ray[],
    degree  : number
};

// Prototypes (default attributes)

const horizontalWallPrototype :HorizontalWall = {
    startX : NaN,
    endX   : NaN,
    posY   : NaN
}

const verticalWallPrototype :VerticalWall = {
    startY : NaN,
    endY   : NaN,
    posX   : NaN
}

const rayPrototype :Ray = { // Duality, every ray has a source, but a ray can be a source of another one as well
    degree     : NaN,
    slope      : NaN,
    YIntercept : NaN,
    collisions : [],
    reflected  : {},
    refracted  : {}
}

const raySourcePrototype :RaySource = {
    pos  : { x : NaN, y : NaN },
    rays    : [],
    degree  : NaN
}

// Integrated agentTypes 

const agentTypes : Object = {

    'HorizontalWall' : {'info' : horizontalWallPrototype},
    'VerticalWall'   : {'info' : verticalWallPrototype, },
    'RaySource'      : {'info' : raySourcePrototype,       'collections' : ['RaySources']},
    'Ray'            : {'info' : rayPrototype,             'collections' : ['Rays']}
};

export default agentTypes;

