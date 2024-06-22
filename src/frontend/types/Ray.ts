import Vector2D             from "../utils/physics/Vector2D.js"
import { VerticalWall }     from "./VerticalWall.js"
import { HorizontalWall }   from "./HorizontalWall.js"

interface Ray {

    active     : boolean,
    level      : number,
    source     : Vector2D,
    direction  : Vector2D,
    collidesAt : Vector2D,
    collidesWith : VerticalWall | HorizontalWall | undefined,
    reflected  : {} | Ray,
}

const rayPrototype :Ray = {

    active      : true,
    source      : new Vector2D(NaN,NaN),
    direction   : new Vector2D(NaN,NaN),
    reflected   : {},
    level       : 1,

    // for collision detection and response

    collidesWith: undefined,
    collidesAt  : (new Vector2D(NaN,NaN)),
}

export { Ray, rayPrototype };