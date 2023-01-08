import Service from "../Service";

class RayCaster extends Service {
    
    #chief;
    
    constructor(chief){
        super();
        this.#chief = chief;
    }
}

export default RayCaster;