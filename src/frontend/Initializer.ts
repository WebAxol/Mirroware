import World from "/pluglightjs/World.js";
import Service from "./Services/Service.js";
import {appSetUp, SetUp} from "./setUp/setUp.js";

class Initializer {

    #hasBeenInitialized : boolean = false;
    private world : World;

    constructor(world){
        this.world = world;
    }

    init(setUp : SetUp) : boolean {

        // Defensive check

        if(this.#hasBeenInitialized){
            console.warn('The Mirroware instance has already been initialized');
            return false;
        }

        if(typeof setUp !== 'object'){
            console.error('The setUp argument must be an object');
            return false;
        }

        // Initialize components

        this.#initAgentTypes(setUp.agentTypes);
        this.#initCollections(setUp.collections);
        this.#initServices(setUp.services);


        // Rise flag to avoid re-initializing

        this.#hasBeenInitialized = true;

        return true;
    }


    // Note: Planning to implement this initialization functions at World for CASES.js; first, lets see how they work here

    #initAgentTypes(agentTypes : object) : boolean {

        // Defensive input check

        if(typeof agentTypes != 'object'){
            console.error('Cannot initialize agent types: the were not passed as an object embedded at setUp');
            return false;
        }

        //

        const types : string[] = Object.keys(agentTypes); 

        types.forEach((typeName) => {

            let prototype :object = agentTypes[typeName];

            if(typeof prototype != 'object'){
                console.error('Each type must be a key value pair, mapping each type with a prototype for each object instanced with that type');
                return false;
            }

            this.world.registerAgentType(typeName, prototype);

        });

        return true;
    }

    #initCollections(collections : string[]) :boolean{
        
        // Defensive input check

        if(!(collections instanceof Array)){
            console.error("The field 'collections' must be a string array with the names of each collection");
            return false;
        }

        //

        collections.forEach( collectionName => {

            let registered = false;

            if(typeof collectionName == 'string' && collectionName != '') registered = this.world.registerCollection(collectionName);

            if(!registered) console.error(`Collection named: '${collectionName}' could not be registered`);
        });


        return true;
    }

    #initServices(services : object) : boolean {

        // Defensive input check

        if(typeof services != 'object'){
            console.error('Cannot initialize services: the were not passed as an object embedded at setUp');
            return false;
        }

        //

        const serviceNames : string[] = Object.keys(services); 

        serviceNames.forEach((serviceName) => {

            let serviceInstance :object = services[serviceName];

            if(!(serviceInstance instanceof Service)){
                console.error(`Cannot register service: "${serviceName}": it must be a key value pair, mapping each service name with an instance of its respective service`);
            }

            this.world.registerService(serviceName, serviceInstance);

        });

        return true;

     
    }
}

const app = new World();
const _init = new Initializer(app);

_init.init(appSetUp);

export default app;