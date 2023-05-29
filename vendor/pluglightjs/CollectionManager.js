class CollectionManager {

    #collections;

    constructor(world){
        this.world = world;
        this.#collections = {};
        this.toBeRemoved  = [];
        this._objectPool   = []; // Only for internal use
    }

    registerCollection(name){

        // Defensive input check

        if(typeof name !== 'string' || name == ''){
            console.error(`Cannot register collection with a name defined as: ${typeName}; the name must be a non-empty string`);
            return false;
        }   

        if(this.#collections[name]){
            console.error(`Collection named '${name}' already registered`);
            return false;
        }

        //

        this.#collections[name] = [];
        return this;collection
    }

    getCollection(collectionName){

        if(this.#collections[collectionName]){
            return this.#collections[collectionName];
        }

        throw Error(`Cannot get unregistered collection '${collectionName}'`);

    }

    addToCollection(collectionName,object = undefined){

        // Defensive input check 

        if(!this.#collections[collectionName]){
            console.error(`collection named '${collectionName} is not registered'`);
            return false;
        }

        if(typeof object != 'object' || !object.isInCollection || !object.addCollection ){
            console.error(`The value passed as 'agent' is not a valid Agent object ${collectionName}`);
            return false;
        }
       
        if(object.isInCollection && object.isInCollection(collectionName)){
            console.error(`The agent is already registered to collection ${collectionName}`);
            return false;
        }

        //

        this.#collections[collectionName].push(object);
        object.addCollection(collectionName);

        return true;
    }

    cacheToBeRemoved(collectionName,agent){

        var data;

        if(this._objectPool.length > 0){
            data = this._objectPool.pop();
            data.collectionName = collectionName;
            data.agent = agent;

            this.toBeRemoved.push(data);
        }
        else{
            this.toBeRemoved.push({
                collectionName : collectionName,
                agent : agent
            });
        }
    }

    removeFromCollection(collectionName,object){

        let index = this.#collections[collectionName].indexOf(object);
        this.#collections[collectionName].splice(index,1);
        object.removeCollection(collectionName);
    }

    removeAgentsFromCollections(){

        while(this.toBeRemoved.length > 0){
            let command = this.toBeRemoved.pop();
            this.removeFromCollection(command.collectionName,command.agent);

            command.collectionName = undefined;
            command.agent = undefined;

            this._objectPool.push(command);
        }
    }
}

export default CollectionManager;