import Service from "../../../Service.js";
import TextureMapper from './TextureMapper.js';
import TextureDisplayer from './TextureDisplayer.js';

class Texturer extends Service{

    protected chief;
    #textureMapper :TextureMapper;
    #textureDisplayer :TextureDisplayer;


    constructor(chief){
        super();
        
        this.chief = chief; // Sub-service of SceneRenderer3D

        // subordinate services

        this.#textureMapper = new TextureMapper(this);
        this.#textureDisplayer = new TextureDisplayer(this);
    }

    public executeAsSubordinate(info){

        this.#textureDisplayer.executeAsSubordinate(info);

    }

}

export default Texturer;