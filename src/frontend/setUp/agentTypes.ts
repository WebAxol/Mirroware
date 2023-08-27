import { horizontalWallPrototype }  from "../types/HorizontalWall.js";
import { verticalWallPrototype }    from "../types/VerticalWall.js";
import { rayPrototype }             from "../types/Ray.js";

const agentTypes : Object = {

    'HorizontalWall' : {'info' : horizontalWallPrototype},
    'VerticalWall'   : {'info' : verticalWallPrototype, },
    'Ray'            : {'info' : rayPrototype}
};

export default agentTypes;

