class SceneBuilder {
    constructor(app) {
        this.app = app;
    }
    build(scene) {
        var horizontal = [];
        var vertical = [];
        var circles = [];
        scene.forEach((element) => {
            if (element.type == "Wall") {
                let segment = element.info;
                let vertexA = segment[0];
                let vertexB = segment[1];
                if (vertexA[0] == vertexB[0] && vertexA[1] != vertexB[1]) {
                    vertical.push(this.buildVerticalWall(vertexA, vertexB, segment[2], segment[3]));
                }
                else if (vertexA[1] == vertexB[1] && vertexA[0] != vertexB[0]) {
                    horizontal.push(this.buildHorizontalWall(vertexA, vertexB, segment[2], segment[3]));
                }
                else {
                    console.warn(`Invalid vertex pair given: the vertices must be different and colinear`);
                }
            }
            else if (element.type == 'Circle') {
                let info = element.info;
                circles.push(this.buildCircle(...info));
            }
        });
        horizontal.sort((a, b) => { return a.posY - b.posY; });
        vertical.sort((a, b) => { return a.posX - b.posX; });
        horizontal.forEach(wall => { this.app.addToCollection('HorizontalWalls', wall); });
        vertical.forEach(wall => { this.app.addToCollection('VerticalWalls', wall); });
        circles.forEach(circle => { this.app.addToCollection('Circles', circle); });
    }
    buildHorizontalWall(vertexA, vertexB, opacity, color) {
        let wall = this.app.createAgent('HorizontalWall', {
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
    buildVerticalWall(vertexA, vertexB, opacity, color) {
        let wall = this.app.createAgent('VerticalWall', {
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
    buildCircle(...args) {
        let circle = this.app.createAgent('Circle', {
            info: {
                radius: args[1],
                center: args[0],
                opacity: args[2],
                color: args[3]
            }
        });
        return circle;
    }
}
export default SceneBuilder;
//# sourceMappingURL=SceneBuilder.js.map