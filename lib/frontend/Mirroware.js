import app from './Initializer.js';
app.execute();
// Playground
// First, create a ray array
var rays = [];
for (let i = 0; i <= 5; i++) {
    let ray = app.createAgent('Ray', {
        'info': {
            degree: i
        }
    });
    rays.push(ray);
}
var raysource = app.createAgent('RaySource', {
    'info': {
        pos: { x: 10, y: 10 },
        rays: rays
    }
});
// Debugging commands (Not for production)
const commands = {
    'w': () => { console.log(app); },
    'r': () => { console.log(app.getCollection('RaySources')); },
    'p': () => {
        app.pauseExecution();
        console.log('execution paused');
    },
    's': () => {
        app.pause = false;
        app.execute();
        console.log('execution resumed');
    }
};
window.addEventListener('keydown', (e) => {
    if (commands[e.key])
        commands[e.key]();
});
