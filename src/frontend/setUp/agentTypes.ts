
// Interfaces

interface HorizontalWall {
    startX : number,
    endX   : number,
    posY   : number
}

interface VerticalWall {
    startX : number,
    endX   : number,
    posY   : number
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
    startX : NaN,
    endX   : NaN,
    posY   : NaN
}

const rayPrototype :Ray = {
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

    'HorizontalWall' : {'info' : horizontalWallPrototype,  'collections' : ['HorizontalWalls']},
    'VerticalWall'   : {'info' : verticalWallPrototype,    'collections' : ['VerticalWalls']},
    'RaySource'      : {'info' : raySourcePrototype,       'collections' : ['RaySources']},
    'Ray'            : {'info' : rayPrototype,             'collections' : ['Rays']}
};

export default agentTypes;

