var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Initializer_instances, _Initializer_hasBeenInitialized, _Initializer_initAgentTypes, _Initializer_initCollections, _Initializer_initServices;
import World from "/cases/World.js";
import Service from "./Services/Service.js";
import { appSetUp } from "./setUp/setUp.js";
class Initializer {
    constructor(world) {
        _Initializer_instances.add(this);
        _Initializer_hasBeenInitialized.set(this, false);
        this.world = world;
    }
    init(setUp) {
        // Defensive check
        if (__classPrivateFieldGet(this, _Initializer_hasBeenInitialized, "f")) {
            console.warn('The Mirroware instance has already been initialized');
            return false;
        }
        if (typeof setUp !== 'object') {
            console.error('The setUp argument must be an object');
            return false;
        }
        // Initialize components
        __classPrivateFieldGet(this, _Initializer_instances, "m", _Initializer_initAgentTypes).call(this, setUp.agentTypes);
        __classPrivateFieldGet(this, _Initializer_instances, "m", _Initializer_initCollections).call(this, setUp.collections);
        __classPrivateFieldGet(this, _Initializer_instances, "m", _Initializer_initServices).call(this, setUp.services);
        // Rise flag to avoid re-initializing
        __classPrivateFieldSet(this, _Initializer_hasBeenInitialized, true, "f");
        return true;
    }
}
_Initializer_hasBeenInitialized = new WeakMap(), _Initializer_instances = new WeakSet(), _Initializer_initAgentTypes = function _Initializer_initAgentTypes(agentTypes) {
    // Defensive input check
    if (typeof agentTypes != 'object') {
        console.error('Cannot initialize agent types: the were not passed as an object embedded at setUp');
        return false;
    }
    //
    const types = Object.keys(agentTypes);
    types.forEach((typeName) => {
        let prototype = agentTypes[typeName];
        if (typeof prototype != 'object') {
            console.error('Each type must be a key value pair, mapping each type with a prototype for each object instanced with that type');
            return false;
        }
        this.world.registerAgentType(typeName, prototype);
    });
    return true;
}, _Initializer_initCollections = function _Initializer_initCollections(collections) {
    // Defensive input check
    if (!(collections instanceof Array)) {
        console.error("The field 'collections' must be a string array with the names of each collection");
        return false;
    }
    //
    collections.forEach(collectionName => {
        let registered = false;
        if (typeof collectionName == 'string' && collectionName != '')
            registered = this.world.registerCollection(collectionName);
        if (!registered)
            console.error(`Collection named: '${collectionName}' could not be registered`);
    });
    return true;
}, _Initializer_initServices = function _Initializer_initServices(services) {
    // Defensive input check
    if (typeof services != 'object') {
        console.error('Cannot initialize services: the were not passed as an object embedded at setUp');
        return false;
    }
    //
    const serviceNames = Object.keys(services);
    serviceNames.forEach((serviceName) => {
        let serviceInstance = services[serviceName];
        if (!(serviceInstance instanceof Service)) {
            console.error(`Cannot register service: "${serviceName}": it must be a key value pair, mapping each service name with an instance of its respective service`);
        }
        this.world.registerService(serviceName, serviceInstance);
    });
    return true;
};
const app = new World();
const _init = new Initializer(app);
_init.init(appSetUp);
export default app;
