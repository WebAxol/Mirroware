import World from '/pluglightjs/World.js';
class Service {
    constructor() {
        this.world = new World();
    }
    execute() {
        return false; // By default, it has no logic on it; each service inheriting this class will implement its execution logic 
    }
    init() {
        return false;
    }
}
export default Service;
