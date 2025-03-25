import CanvasManager from '../utils/rendering/CanvasManager.js';
;
const canvases = {
    canvas3d: CanvasManager.createCanvas({
        id: 'canvas3d',
        width: 300 * 2 * 1,
        height: 170 * 2 * 1,
        style: {
            width: '100%',
            zIndex: 2,
            background: "black",
            'image-rendering': 'pixelated',
        }
    }),
    background: CanvasManager.createCanvas({
        id: 'background',
        width: 3000 / 4,
        height: 1700 / 4,
        style: {
            zIndex: 1,
            width: '100%',
            background: 'linear-gradient(180deg, rgba(125,213,205,1) 0%, rgba(155,100,50,0.9836309523809523) 50%)'
        }
    }),
    front: CanvasManager.createCanvas({
        id: 'background',
        width: 3000 / 4,
        height: 1700 / 4,
        style: {
            zIndex: 3,
            width: '100%',
            background: "radial-gradient(circle, rgba(0, 217, 255, 0.1) 0%, rgba(0, 255, 242, 0.2) 100%)"
        }
    }),
    canvas2d: CanvasManager.createCanvas({
        id: 'canvas2d',
        width: 100,
        height: 100,
        style: {
            zIndex: 3,
            position: 'absolute',
            borderRadius: '50%',
            top: '5px',
            right: '5px',
            width: '20%',
            height: 'auto',
            opacity: '0.7',
            'image-rendering': 'pixelated'
        }
    })
};
export default canvases;
//# sourceMappingURL=canvases.js.map