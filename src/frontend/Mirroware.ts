import app from './Initializer.js';
import { Camera, camera } from './utils/Camera.js';


// Playground

// TODO: create abstraction layer to lessen the work of building scenes; for now, we'll imperatively define everything
// Justification: feasability is a priority; In the future, the project can be enhanced

// First, create a ray array - TODO: Make a more easy and safe way of defining rays with theur raysources



const n = 300;

for(let i : number = 0; i < n; i++){
    let ray = app.createAgent('Ray',{
        'info' : {
            degree : (i * (100 / n))
        }
    });

    ray.source = camera;
    camera.rays.push(ray);
}



// Create a simple scene (composed by horizontal and vertical walls);

const testScene = [
    [[5,5],[5,25],   1, '255,0,0'],
    [[5, 5],[25, 5], 0.3, '0,255,100'],
    [[5, 7],[7, 7],  1, '0,255,100'],
    [[7, 5],[7, 7],  1, '0,255,200'],
    [[7, 15],[7, 20],  1, '0,155,200'],
    [[7, 20],[15, 20],  0.1, '0,0,0'],
    [[25,5],[25,25], 1, '0,0,255'],
    [[5,25],[25,25], 0.1, '255,255,0']
];

// TODO: replace by a module specialized on building scenes

function buildScene(app, scene : Object[]){
    

    var horizontal :object[] = [], vertical :object[] = [];

    function buildVerticalWall(vertexA,vertexB,opacity,color){

        // Warning: Hardcoded app reference

        let wall = app.createAgent('VerticalWall',{
            info : {
                startY  : Math.min(vertexA[1],vertexB[1]),
                endY    : Math.max(vertexA[1],vertexB[1]),
                posX    : vertexA[0],
                opacity : opacity || 1,
                color  : color || 'white' 
            }
        });

        return wall;
    };

    function buildHorizontalWall(vertexA,vertexB,opacity,color){

          // Warning: Hardcoded app referencep

        let wall = app.createAgent('HorizontalWall',{
            info : {
                startX : Math.min(vertexA[0],vertexB[0]),
                endX   : Math.max(vertexA[0],vertexB[0]),
                posY   : vertexA[1],
                opacity: opacity || 1,
                color  : color || 'white' 
            }
        });

        return wall;
    };

    scene.forEach(segment => {

        let vertexA = segment[0];
        let vertexB = segment[1];
      
        if(vertexA[0] == vertexB[0] && vertexA[1] != vertexB[1]){
            vertical.push(buildVerticalWall(vertexA,vertexB,segment[2],segment[3]));
        } 

        else if(vertexA[1] == vertexB[1] && vertexA[0] != vertexB[0]){
            horizontal.push(buildHorizontalWall(vertexA,vertexB,segment[2],segment[3]));
        } 

        else{
            console.warn(`Invalid vertex pair given: the vertices must be different and colinear`);
        }    
    });

    // Sort wall arrays

    horizontal.sort((a : any, b : any ) => {return a.posY - b.posY});
    vertical.sort(  (a : any, b : any ) => {return a.posX - b.posX});

    // Add walls to their respective collections

    horizontal.forEach(wall => { app.addToCollection('HorizontalWalls', wall) });
    vertical.forEach(  wall => { app.addToCollection('VerticalWalls', wall) });

}

buildScene(app,testScene);


/* ------ Debugging commands (Not for production) ------- */

const commands = {
    'w' : () => { console.log(app) },
    'r' : () => { console.log(app.getCollection('RaySources')) },
    'p' : () => { 
        app.pauseExecution(); 
        //console.log('execution paused');
    },
    's' : () => {
        app.pause = false;
        app.execute();
        //console.log('execution resumed');
    }   

}

/*

window.addEventListener('keydown', (e) => {

    if(commands[e.key]) commands[e.key]();

})
*/
// execute

app.execute();