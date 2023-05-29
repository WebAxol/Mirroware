import World from '/pluglightjs/World.js';

class Service{

    public world : World;

    constructor(){
        this.world = new World();
    }

    public execute() : any{
        return false; // By default, it has no logic on it; each service inheriting this class will implement its execution logic 
    }

    public init() : any{
        return false;
    }
}

export default Service;