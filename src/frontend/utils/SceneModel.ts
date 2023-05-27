class SceneModel {

    public layers :SceneChunk[];

    constructor(){
        this.layers = [];
    }
}

interface SceneChunk {
    item :Object;
    from :Object;
    to   :Object;
}   

export default SceneModel;
