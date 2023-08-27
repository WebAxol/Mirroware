import app from './Initializer.js';
import { camera } from './utils/Camera.js';
import SceneBuilder from './utils/SceneBuilder.js';
// Playground
// TODO: create abstraction layer to lessen the work of building scenes; for now, we'll imperatively define everything
// Justification: feasability is a priority; In the future, the project can be enhanced
// First, create an array containing rays - TODO: Make an easier and safer way of defining rays with their raysources
const n = 300;
for (let i = 0; i < n; i++) {
    let ray = app.createAgent('Ray', {
        'info': {
            degree: (i * (100 / n))
        }
    });
    ray.source = camera;
    camera.rays.push(ray);
}
// Create a simple scene (composed by horizontal and vertical walls);
// [from, to, opacity, color]
const testScene = [
    { type: 'Wall', info: [[8, 5], [8, 25], 1, '255,255,0'] },
    { type: 'Wall', info: [[10, 5], [10, -20], 0.2, '0,255,0'] },
    { type: 'Wall', info: [[12, 5], [12, -20], 0.2, '255,0,0'] },
    { type: 'Wall', info: [[5, -24], [5, -25], 1, '255,0,100'] },
    { type: 'Wall', info: [[5, -21], [5, -20], 1, '0,255,100'] },
    { type: 'Wall', info: [[5, -21], [-20, -21], 0.2, '0,255,100'] },
    { type: 'Wall', info: [[5, -24], [-20, -24], 0.2, '255,0,100'] },
    { type: 'Wall', info: [[5, -20], [10, -20], 1, '0,255,100'] },
    { type: 'Wall', info: [[12, -20], [25, -20], 1, '0,255,100'] },
    { type: 'Wall', info: [[5, -25], [35, -25], 1, '255,157,0'] },
    { type: 'Wall', info: [[25, -20], [25, -25], 1, '255,157,0'] },
    { type: 'Wall', info: [[-25, -20], [-25, -25], 1, '255,157,0'] },
    { type: 'Wall', info: [[5, 5], [10, 5], 1, '0,255,100'] },
    { type: 'Wall', info: [[12, 5], [25, 5], 1, '0,255,100'] },
    { type: 'Wall', info: [[5, 7], [7, 7], 1, '0,255,100'] },
    { type: 'Wall', info: [[7, 5], [7, 7], 1, '0,255,200'] },
    { type: 'Wall', info: [[7, 15], [7, 20], 1, '0,155,200'] },
    { type: 'Wall', info: [[7, 20], [15, 20], 1, '255,0,0'] },
    { type: 'Wall', info: [[25, 5], [25, 26], 1, '150,150,150'] },
    { type: 'Wall', info: [[5, 25], [25, 25], 0.5, '255,157,0'] },
    { type: 'Wall', info: [[15, 7], [17, 7], 1, '255,0,255'] },
    { type: 'Wall', info: [[15, 7], [15, 10], 1, '255,155,255'] },
    { type: 'Wall', info: [[15, 10], [15.5, 10], 1, '255,155,200'] },
    { type: 'Wall', info: [[17, 7], [17, 10], 1, '255,155,255'] },
    { type: 'Wall', info: [[16.5, 7], [16.5, 10], 1, '255,155,255'] },
    { type: 'Wall', info: [[16.5, 10], [17, 10], 1, '255,155,200'] },
    { type: 'Wall', info: [[19, 12], [22, 12], 0.1, '0,255,100'] },
    { type: 'Wall', info: [[19, 15], [22, 15], 0.1, '0,255,100'] },
    { type: 'Wall', info: [[22, 12], [22, 15], 1, '255,157,0'] },
    { type: 'Wall', info: [[19, 12], [19, 15], 1, '255,157,0'] }
];
// TODO: replace by a module specialized on building scenes
const sceneBuilder = new SceneBuilder(app);
sceneBuilder.build(testScene);
/* ------ Debugging commands (Not for production) ------- */
const commands = {
    'o': () => { console.log(app); },
    'c': () => { console.log(camera); },
    'p': () => {
        app.pauseExecution();
        console.log('execution paused');
    },
    'r': () => {
        app.pause = false;
        app.execute();
        console.log('execution resumed');
    }
};
window.addEventListener('keydown', (e) => {
    if (commands[e.key])
        commands[e.key]();
});
// execute
app.execute();
//# sourceMappingURL=Mirroware.js.map