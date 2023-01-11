import app from './Initializer.js';

// Playground

// TODO: create abstraction layer to lessen the work of building scenes; for now, we'll imperatively define everything
// Justification: feasability is a priority; In the future, the project can be enhanced

// First, create a ray array - TODO: Make a more easy and safe way of defining rays with theur raysources


var rays :object[] = [];

var raysource = app.createAgent('RaySource',{
    'info' : {
        pos    : { x : 20, y : 20},
    }
});

for(let i : number = 0; i < 300; i++){
    let ray = app.createAgent('Ray',{
        'info' : {
            degree : (i / 8) + 245
        }
    });

    ray.source = raysource;
    rays.push(ray);
}

raysource.rays = rays;


// Create a simple scene (composed by horizontal and vertical walls);

const testScene = [
    [[5,5],[5,25], false],
    [[10,10],[10,15], false],
    [[10,17],[10,20], false],
    [[25,5],[25,25], false],
    [[0,27],[30,27], false],
    [[10,10],[15,10], true],
    [[0,5],[100,5], true]

]

const scene = [

    [[9,6],[12,6],   true],
    [[9,15],[20,15], true],
    [[20,15],[20,5], true],
    [[15,10],[15,0], true],
    [[25,0],[25,50], true],
    [[10,20],[25,20],true],
    //[[10,20],[10,0], true],





];

// TODO: replace by a module specialized on building scenes

function buildScene(app, scene : Object[]){
    

    var horizontal :object[] = [], vertical :object[] = [];

    function buildVerticalWall(vertexA,vertexB,isMirror){

        // Warning: Hardcoded app reference

        let wall = app.createAgent('VerticalWall',{
            info : {
                startY  : Math.min(vertexA[1],vertexB[1]),
                endY    : Math.max(vertexA[1],vertexB[1]),
                posX    : vertexA[0],
                isMirror: isMirror
            }
        });

        return wall;
    };

    function buildHorizontalWall(vertexA,vertexB,isMirror){

          // Warning: Hardcoded app reference

        let wall = app.createAgent('HorizontalWall',{
            info : {
                startX : Math.min(vertexA[0],vertexB[0]),
                endX   : Math.max(vertexA[0],vertexB[0]),
                posY   : vertexA[1],
                isMirror: isMirror
            }
        });

        return wall;
    };

    scene.forEach(segment => {

        let vertexA = segment[0];
        let vertexB = segment[1];
      
        if(vertexA[0] == vertexB[0] && vertexA[1] != vertexB[1]){
            vertical.push(buildVerticalWall(vertexA,vertexB,segment[2]));
        } 

        else if(vertexA[1] == vertexB[1] && vertexA[0] != vertexB[0]){
            horizontal.push(buildHorizontalWall(vertexA,vertexB,segment[2]));
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