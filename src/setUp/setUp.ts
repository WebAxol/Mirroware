
import agentTypes   from "./agentTypes.js";
import collections  from "./collections.js";
import services     from "./services.js";
import events       from "./events.js";

interface SetUp {
    agentTypes  : object,
    collections : string[],
    services    : object,
    events      : object
};


const appSetUp :SetUp = {
    "agentTypes"  : agentTypes,
    "collections" : collections,
    "services"    : services,
    "events"      : events
};

export { SetUp, appSetUp };
