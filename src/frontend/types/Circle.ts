import Vector2D from '../utils/physics/Vector2D.js';

interface Circle {
    center : Vector2D,
    radius : number,
    color : string,
    opacity : number
};

const circlePrototype :Circle = {
    center : new Vector2D(0,0),
    radius : 1,
    color  : '255,0,0',
    opacity : 1
};

export { Circle, circlePrototype };