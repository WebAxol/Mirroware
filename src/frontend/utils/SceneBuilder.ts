import World from '/pluglightjs/World.js';

class SceneBuilder {

    protected app :World;

    constructor(app){
        this.app = app;
    }

    public build(scene){
        
        var horizontal :object[] = [];
        var vertical   :object[] = [];

        scene.forEach((element :any) => {

            if(element.type == "Wall"){

                let segment = element.info;

                let vertexA = segment[0];
                let vertexB = segment[1];
            
                if(vertexA[0] == vertexB[0] && vertexA[1] != vertexB[1]){
                    vertical.push(this.buildVerticalWall(vertexA,vertexB,segment[2],segment[3]));
                } 
        
                else if(vertexA[1] == vertexB[1] && vertexA[0] != vertexB[0]){
                    horizontal.push(this.buildHorizontalWall(vertexA,vertexB,segment[2],segment[3]));
                } 
        
                else{
                    console.warn(`Invalid vertex pair given: the vertices must be different and colinear`);
                }    
            }
        });


    horizontal.sort((a : any, b : any ) => {return a.posY - b.posY});
    vertical.sort(  (a : any, b : any ) => {return a.posX - b.posX});

    // Add walls to their respective collections

    horizontal.forEach(wall => { this.app.addToCollection('HorizontalWalls', wall) });
    vertical.forEach(  wall => { this.app.addToCollection('VerticalWalls', wall) });


    }

    private  buildHorizontalWall(vertexA,vertexB,opacity,color){

        // Warning: Hardcoded app reference

        let wall = this.app.createAgent('HorizontalWall',{
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

    private buildVerticalWall(vertexA,vertexB,opacity,color){

        // Warning: Hardcoded app reference

        let wall = this.app.createAgent('VerticalWall',{
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


}
export default SceneBuilder;
