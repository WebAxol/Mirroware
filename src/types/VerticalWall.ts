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

export {VerticalWall, verticalWallPrototype};