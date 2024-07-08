import { camera }        from "../../frontend/utils/scene/Camera.js";
import { Ray }           from "../../frontend/types/Ray.js";
import RenderingPipeline from "../../frontend/Services/SceneRendering/Orchestrator.js";
import Service           from "../../frontend/Services/Service.js";
import Vector2D          from "../../frontend/utils/physics/Vector2D.js";


const mountTestScene = (service) => {

    const direction = new Vector2D(1,1);

    (camera as any).castCenter = {
        source    : camera.pos,
        direction : direction
    } as Ray;

    (camera as any).castEdge  = {
        source    : camera.pos,
        direction : Vector2D.complexRotate(
            direction,
            [  Math.cos(camera.FOV * Math.PI / 360), Math.sin(camera.FOV  * Math.PI / 360) ]
        )
    } as Ray;

    const verticalWalls   = [];
    const horizontalWalls = [];

    (service as any).world = {
        getCollection : jest.fn().mockImplementation((name) => {
            return {
                "VerticalWalls"   : verticalWalls,
                "HorizontalWalls" : horizontalWalls
            }[name];
        }),
    };
}

describe("RenderingPipeline service", () => {

    const service = new RenderingPipeline();

    it("must be an instance of 'RenderingPipeline' and 'Service'", () => {
        expect(service).toBeInstanceOf(RenderingPipeline);        
        expect(service).toBeInstanceOf(Service);        
    });

    const startLoop = (callback) => {

        let frame = 0;

        const animationInterval = setInterval(() => {
            frame++;

            callback();
            
            if (frame >= 1) {
                clearInterval(animationInterval);
            }
        }, 100);
    }
    test('execution at multiple frames', () => {

        mountTestScene(service);

        jest.useFakeTimers();
    
        let res = true;
    
        function callback() {
            //res = service.execute();
        }

        startLoop(callback);
    
        jest.advanceTimersByTime(1000);
    
        if(!service.locator) return expect(res).toBe(false);

        expect(res).toBe(true);
    });
});