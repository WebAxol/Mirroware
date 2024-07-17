
class ImageLoader {
    
    #textures :Map<string, HTMLImageElement> = new Map();

    public load(name : string ,src : string) : true | void {

        if(typeof name !== 'string' || !name){
            throw Error(`Invalid texture name given, it must be a non-empty string`);
        }

        if(this.#textures.get(name)) throw Error(`Cannot add texture with name '${name}'; the name has already been registered`);
        
        try{
            const image = new Image();
            image.src = './assets/textures/' + src; // at '/public'
            this.#textures.set(name, image);
        }
        catch(err){
            throw Error(`The image with source '/img/textures/${src}' could not be found`);
        }

        return true;
    }


    public remove(name : string) : boolean {
        
        return this.#textures.delete(name);
    }

    
    public get(name : string) :HTMLImageElement | false {

        const texture = this.#textures.get(name);
        
        return texture ? texture : false;
    }
}

export default ImageLoader;