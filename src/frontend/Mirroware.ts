import app from './Initializer.js';

// Playground

// TODO: create abstraction layer to lessen the work of building scenes; for now, we'll imperatively define everything
// Justification: feasability is a priority; In the future, the project can be enhanced

// First, create a ray array

var rays :object[] = [];

for(let i : number = 0; i < 1; i++){
    let ray = app.createAgent('Ray',{
        'info' : {
            degree : 280
        }
    });

    rays.push(ray);
}

var raysource = app.createAgent('RaySource',{
    'info' : {
        pos    : { x : 15, y : 25},
        rays   : rays
    }
});

// Create a simple scene (composed by horizontal and vertical walls);

const scene = [

    [[10,10],[10,20]],
    [[10,10],[20,10]],
    [[10,20],[20,20]],
    [[20,20],[20,10]]
];

// TODO: replace by a module specialized on building scenes

function buildScene(app, scene : Object[]){
    

    var horizontal :object[] = [], vertical :object[] = [];

    function buildVerticalWall(vertexA,vertexB){

        // Warning: Hardcoded app reference

        let wall = app.createAgent('VerticalWall',{
            info : {
                startY : Math.min(vertexA[1],vertexB[1]),
                endY   : Math.max(vertexA[1],vertexB[1]),
                posX   : vertexA[0]
            }
        });

        return wall;
    };

    function buildHorizontalWall(vertexA,vertexB){

          // Warning: Hardcoded app reference

        let wall = app.createAgent('HorizontalWall',{
            info : {
                startX : Math.min(vertexA[0],vertexB[0]),
                endX   : Math.max(vertexA[0],vertexB[0]),
                posY   : vertexA[1]
            }
        });

        return wall;
    };

    scene.forEach(segment => {

        let vertexA = segment[0];
        let vertexB = segment[1];
      
        if(vertexA[0] == vertexB[0] && vertexA[1] != vertexB[1]){
            vertical.push(buildVerticalWall(vertexA,vertexB));
        } 

        else if(vertexA[1] == vertexB[1] && vertexA[0] != vertexB[0]){
            horizontal.push(buildHorizontalWall(vertexA,vertexB));
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

buildScene(app,scene);


/* ------ Debugging commands (Not for production) ------- */


const commands = {
    'w' : () => { console.log(app) },
    'r' : () => { console.log(app.getCollection('RaySources')) },
    'p' : () => { 
        app.pauseExecution(); 
        console.log('execution paused');
    },
    's' : () => {
        app.pause = false;
        app.execute();
        console.log('execution resumed');
    }   

}

window.addEventListener('keydown', (e) => {

    if(commands[e.key]) commands[e.key]();

})

// execute

app.execute();