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

export {HorizontalWall, horizontalWallPrototype};