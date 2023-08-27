import Vector2D             from "../utils/Vector2D.js"
import { VerticalWall }     from "./VerticalWall.js"
import { HorizontalWall }   from "./HorizontalWall.js"

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

export { Ray, rayPrototype };