import { horizontalWallPrototype }  from "../types/HorizontalWall.js";
import { verticalWallPrototype }    from "../types/VerticalWall.js";
import { rayPrototype }             from "../types/Ray.js";
import { circlePrototype }          from "../types/Circle.js";

const agentTypes : Object = {

    'HorizontalWall' : {'info' : horizontalWallPrototype},
    'VerticalWall'   : {'info' : verticalWallPrototype, },
    'Circle'         : {'info' : circlePrototype},
    'Ray'            : {'info' : rayPrototype}
};

export default agentTypes;

