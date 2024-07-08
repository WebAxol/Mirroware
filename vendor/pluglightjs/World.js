import AgentPool from "./AgentPool.js";
import CollectionManager from "./CollectionManager.js";
import EventManager from "./EventManager.js";
import ServiceManager from "./ServiceManager.js";

class World {

    #agentPool;
    #collectionManager;
    #serviceManager;
    #eventManager;

    constructor(){

         // subordinate modules

        this.#agentPool         = new AgentPool(this);
        this.#collectionManager = new CollectionManager(this);
        this.#eventManager      = new EventManager(this);
        this.#serviceManager    = new ServiceManager(this);

        //Iteration
        this.lastTime = 10;
        this.deltaTime = NaN;
        this.fps = NaN;
        this.frame = 0;
        this.routine = () => {};
        this.pause = false;
    }

    registerService(name,service){
        return this.#serviceManager.registerService(name,service);
    }

    getServices(){
        return this.#serviceManager.getServices();
    }

    getService(serviceName){
        return this.#serviceManager.getService(serviceName);
    }

    registerCollection(name){
        return this.#collectionManager.registerCollection(name);
    }

    getCollection(collectionName){
        return this.#collectionManager.getCollection(collectionName);
    }


    addToCollection(collectionName,object){
        return this.#collectionManager.addToCollection(collectionName,object);
    }

    removeFromCollection(collectionName,object){
        return this.#collectionManager.cacheToBeRemoved(collectionName,object);
    }

    registerAgentType(typeName,prototype){
        return this.#agentPool.registerType(typeName,prototype);
    }

    createAgent(typeName,details = undefined){

        let agent = this.#agentPool.createAgent(typeName,details);
        
        let collections = this.#agentPool.getCollectionsOfType(typeName);

        collections.forEach((collection) => {
            this.addToCollection(collection, agent);
        });

        return agent;
    }

    removeAgent(agent){
        this.#agentPool.storeToBeRemoved(agent);
    }

    registerEvent(eventName){
        this.#eventManager.registerEvent(eventName);
    }

    registerServiceToEvent(serviceName,eventName){
        this.#eventManager.registerServiceToEvent(serviceName,eventName);
    }

    notifyEvent(eventName,details){
        this.#eventManager.notifyToServices(eventName,details);
    }

    execute(timeSpan = 20){
        
        try{

            if(this.pause) return;
            
            this.deltaTime = timeSpan - this.lastTime;

            this.fps = 1000 / this.deltaTime;

            if(this.frame % 5 === 0) document.getElementById("fps-counter").innerHTML = `FPS: ${this.fps.toFixed(2)}`;

            this.lastTime = timeSpan;

            requestAnimationFrame((timeSpan) => { this.execute(timeSpan) });

            this.#agentPool.removeAgents();
            this.#collectionManager.removeAgentsFromCollections();
            var services = this.getServices();

            Object.keys(services).forEach((service) => {
                    services[service].execute();
            });

            this.routine(this);
            this.frame++;

        }
        catch(err){
            this.pauseExecution();
            console.warn('Execution paused due to run-time error:');
            throw err;
        }
    }

    pauseExecution(){
        this.pause = true;
    }
}

export default World;