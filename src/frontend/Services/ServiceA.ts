import Service from "./Service.js";

class ServiceA extends Service{

    constructor(){
        super();
    }

    public execute(): string {
        console.log('I am service A');
        return '';
    }

}

export default ServiceA;