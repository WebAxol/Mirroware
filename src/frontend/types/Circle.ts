import Vector2D from '../utils/Vector2D.js';

interface Circle {
    center : Vector2D,
    radius : number
};

const circlePrototype :Circle = {
    center : new Vector2D(0,0),
    radius : 1
};

export { Circle, circlePrototype };