import Service from "../Service.js";

class RayCaster extends Service {
    
    #chief;
    
    constructor(chief){
        super();
        this.#chief = chief;
    }
}

export default RayCaster;