import { text } from "body-parser";

class Textures {
    
    #textures = {};

    public addTexture(textureName : string ,src : string) : boolean {

        if(typeof textureName !== 'string' || !textureName){
            throw Error(`Invalid texture name given, it must be a non-empty string`);
        }

        if(this.#textures[textureName]){ 
            throw Error(`Cannot add texture with name '${textureName}'; the name has already been registered`);
        }

        let image;

        try{
            image = new Image();
            image.src = './img/textures/' + src; // at '/public'
        }
        catch(err){
            throw Error(`The image with source '/img/textures/${src}' could not be found`);
        }

        this.#textures[textureName] = image;
        return true;
    }

    public removeTexture(textureName : string) : boolean { // remove Texture

        if(!this.#textures[textureName]){
            return false;
        }

        delete this.#textures[textureName];

        return true;
    }

    public getTexture(textureName : string){ // get Texture

        if(!this.#textures[textureName]){
            return false;
        }
        
        return this.#textures[textureName];

    }

}

const textures = new Textures();

// add Textures to 'textures' : textures.add(textureName,src);

textures.addTexture('netherrack','netherrack.png');
textures.addTexture('dirt','dirt.png');
textures.addTexture('bricks','bricks.png');



//

export default textures;