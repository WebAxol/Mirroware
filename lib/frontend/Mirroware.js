import app from './Initializer.js';
import { camera } from './utils/Camera.js';
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
    [[5, 5], [5, 25], 1, '0,255,0'],
    [[5, 5], [25, 5], 1, '0,255,100'],
    [[5, 7], [7, 7], 1, '0,255,100'],
    [[7, 5], [7, 7], 1, '0,255,200'],
    [[7, 15], [7, 20], 0.2, '0,155,200'],
    [[7, 20], [15, 20], 1, '255,0,0'],
    [[25, 5], [25, 26], 1, '150,150,150'],
    [[5, 25], [25, 25], 0.5, '0,255,255'],
    [[15, 7], [17, 7], 1, '255,0,255'],
    [[15, 7], [15, 10], 1, '255,155,255'],
    [[15, 10], [15.5, 10], 1, '255,155,200'],
    [[15, 7], [15.5, 10], 1, '255,155,255'],
    [[17, 7], [17, 10], 1, '255,155,255'],
    [[16.5, 7], [16.5, 10], 1, '255,155,255'],
    [[16.5, 10], [17, 10], 1, '255,155,200'],
    [[19, 12], [22, 12], 0.1, '0,255,100'],
    [[19, 15], [22, 15], 0.1, '0,255,100'],
    [[22, 12], [22, 15], 0.1, '0,255,200'],
    [[19, 12], [19, 15], 0.1, '0,255,200']
];
// TODO: replace by a module specialized on building scenes
function buildScene(app, scene) {
    var horizontal = [], vertical = [];
    function buildVerticalWall(vertexA, vertexB, opacity, color) {
        // Warning: Hardcoded app reference
        let wall = app.createAgent('VerticalWall', {
            info: {
                startY: Math.min(vertexA[1], vertexB[1]),
                endY: Math.max(vertexA[1], vertexB[1]),
                posX: vertexA[0],
                opacity: opacity || 1,
                color: color || 'white'
            }
        });
        return wall;
    }
    ;
    function buildHorizontalWall(vertexA, vertexB, opacity, color) {
        // Warning: Hardcoded app reference
        let wall = app.createAgent('HorizontalWall', {
            info: {
                startX: Math.min(vertexA[0], vertexB[0]),
                endX: Math.max(vertexA[0], vertexB[0]),
                posY: vertexA[1],
                opacity: opacity || 1,
                color: color || 'white'
            }
        });
        return wall;
    }
    ;
    scene.forEach(segment => {
        let vertexA = segment[0];
        let vertexB = segment[1];
        if (vertexA[0] == vertexB[0] && vertexA[1] != vertexB[1]) {
            vertical.push(buildVerticalWall(vertexA, vertexB, segment[2], segment[3]));
        }
        else if (vertexA[1] == vertexB[1] && vertexA[0] != vertexB[0]) {
            horizontal.push(buildHorizontalWall(vertexA, vertexB, segment[2], segment[3]));
        }
        else {
            console.warn(`Invalid vertex pair given: the vertices must be different and colinear`);
        }
    });
    // Sort wall arrays
    horizontal.sort((a, b) => { return a.posY - b.posY; });
    vertical.sort((a, b) => { return a.posX - b.posX; });
    // Add walls to their respective collections
    horizontal.forEach(wall => { app.addToCollection('HorizontalWalls', wall); });
    vertical.forEach(wall => { app.addToCollection('VerticalWalls', wall); });
}
buildScene(app, testScene);
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
