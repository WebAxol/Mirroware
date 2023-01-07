import Service from "./Service.js";
class ServiceA extends Service {
    constructor() {
        super();
    }
    execute() {
        console.log('I am service A');
        return '';
    }
}
export default ServiceA;
