const canvas2d = document.querySelector('#canvas2d');
const canvas3d = document.querySelector('#canvas3d');
class CanvasManager {
    constructor() {
        this.canvases = new Map();
    }
    createCanvas(details) {
        const canvasContainer = document.querySelector('.canvasContainer');
        const canvas = document.createElement('canvas');
        if (document.getElementById(details.id) !== null || this.canvases.get(details.id) !== undefined) {
            console.warn(`Violation: unexpectedly, an element already exists having the id '${details.id}' the canvas is supposed to adquire`);
        }
        canvas.id = details.id;
        canvas.width = details.width;
        canvas.height = details.height;
        canvas.style.position = 'absolute';
        if (details.style === null)
            return canvas;
        for (let property in details.style) {
            canvas.style[property] = details.style[property];
        }
        if (canvasContainer === null) {
            document.body.appendChild(canvas);
            console.warn("You must define a <div> container with the id 'canvasContainer'; the canvas will be allocated at the root element '<body>' because the container was not defined ");
        }
        else
            canvasContainer.appendChild(canvas);
        this.canvases.set(canvas.id, canvas);
        return canvas;
    }
    deleteCanvas(canvas) {
        const canvasID = canvas.id;
        this.canvases.delete(canvasID);
        const canvasContainer = document.querySelector('.canvasContainer');
        if (canvasContainer === null)
            return;
        canvasContainer.removeChild(canvas);
    }
    getCanvas(canvasID) {
        const canvas = this.canvases.get(canvasID);
        return canvas !== undefined ? canvas : false;
    }
}
const instance = new CanvasManager();
export { canvas2d, canvas3d };
export default instance;
//# sourceMappingURL=CanvasManager.js.map