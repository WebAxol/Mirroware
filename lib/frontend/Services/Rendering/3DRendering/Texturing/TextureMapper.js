import Service from '../../../Service.js';
class TextureMapper extends Service {
    constructor(chief) {
        super();
        this.chief = chief;
    }
    ;
    executeAsSubordinate(info) {
        let percent = info.item.from;
    }
}
export default TextureMapper;
