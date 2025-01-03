
interface CanvasSchema {

    id     : string, 
    width  : number;
    height : number;
    style  : undefined | { [property : string]  : any }; 
}

class CanvasManager {

    private canvases :Map<string,HTMLCanvasElement>;

    constructor(){
        this.canvases = new Map();
    }

    public createCanvas(details : CanvasSchema) :HTMLCanvasElement{

        const canvasContainer :null | HTMLDivElement = document.querySelector('.canvasContainer');

        const canvas :HTMLCanvasElement = document.createElement('canvas');

        // Deffensive check : for existing element with id == nextID; we must avoid id's to clash

        if(document.getElementById(details.id) !== null || this.canvases.get(details.id) !== undefined){

            console.warn(`Violation: unexpectedly, an element already exists having the id '${details.id}' the canvas is supposed to adquire`);
        }


        canvas.id     =  details.id;
        canvas.width  = details.width;
        canvas.height = details.height;

        canvas.style.position = 'absolute';
        //canvas.style.zIndex = '-1';

        if(details.style === null) return canvas;

        for(let property in details.style){

            canvas.style[property] = details.style[property]; 
        }

        if(canvasContainer === null){

            document.body.appendChild(canvas);
            console.warn("You must define a <div> container with the id 'canvasContainer'; the canvas will be allocated at the root element '<body>' because the container was not defined ");
        }

        else canvasContainer.appendChild(canvas);
        
        this.canvases.set(canvas.id,canvas);

        return canvas;
    }

    public deleteCanvas(canvas :HTMLCanvasElement) :void {

        const canvasID :string = canvas.id;        

        this.canvases.delete(canvasID);

        const canvasContainer :null | HTMLDivElement = document.querySelector('.canvasContainer');

        if(canvasContainer === null) return;

        canvasContainer.removeChild(canvas);

    }

    public getCanvas(canvasID) : HTMLCanvasElement | false{

        const canvas = this.canvases.get(canvasID);

        return canvas !== undefined ? canvas : false;

    }
}

const instance = new CanvasManager();

export default instance;