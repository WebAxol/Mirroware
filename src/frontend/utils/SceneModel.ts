class SceneModel {

    protected layers  :any[];
    protected lastIDs :number[];
    protected prevIndices :number[];

    constructor(){
        this.layers = []; 
        this.prevIndices = Array(5).fill(-1);
        this.lastIDs     = Array(5).fill(NaN); // per layer

        for(let i = 0; i < 5; i++) this.layers.push([]);

    }

    public update(ray :any){

        let item  :any = ray.collidesWith || undefined;
        let layer :number = ray.level - 1;

        try{

        if(!item) return false;

        let sameAsLast = this.lastIDs[layer] >= 0 && item.getID() === this.lastIDs[layer];

        if(sameAsLast){

            let chunk :SceneChunk = this.layers[layer][this.prevIndices[layer]];
            chunk.to  = ray;
            chunk.old = true;
        }
        else{

            let index    = ++this.prevIndices[layer];
            let oldChunk = this.layers[layer][index] || undefined;

            if(oldChunk){   // reuse old scene chunk
                oldChunk.item = item,
                oldChunk.from = ray;
                oldChunk.to   = ray;
                oldChunk.old  = true;
            }
            else{           // allocate new scene chunk
                this.layers[layer].push({
                    item : item,
                    from : ray,
                    to   : ray,
                    old  : true
                });
            }
        }

        this.lastIDs[ray.level - 1] = item.getID();

        }catch(err){
            console.log(ray);
            console.error(err);
            throw Error('error at scene model');
        }
    }

    public purge(){

        for(let i = 0; i < this.layers.length; i++){

            let layer :any = this.layers[i];

            for(let j = 0; j < layer.length; ){

                this.layers[i].shift();
            }

            this.prevIndices[i] = -1;
            this.lastIDs[i] = NaN;
        }
    }
}

interface SceneLayer {
    [id :number] :SceneChunk
}

interface SceneChunk {
    item    :Object;
    from    :Object;
    to      :Object;
    old     :boolean
}   

export default SceneModel;
