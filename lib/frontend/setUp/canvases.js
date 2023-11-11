import CanvasManager from '../utils/CanvasManager.js';
const canvases = {
    canvas3d: CanvasManager.createCanvas({
        id: 'canvas3d',
        width: 3000,
        height: 1700,
        style: {
            width: '100%',
            zIndex: 2,
            //background: ' radial-gradient(transparent, rgba(0, 0, 0,1))'
        }
    }),
    background: CanvasManager.createCanvas({
        id: 'background',
        width: 3000,
        height: 1700,
        style: {
            zIndex: 1,
            width: '100%',
            //background: "white"
            background: 'linear-gradient(180deg, rgba(125,213,205,1) 0%, rgba(155,100,50,0.9836309523809523) 50%)'
            //background : 'url(https://t3.ftcdn.net/jpg/03/01/35/54/360_F_301355492_a8MJpnsU9oS1M05g7dXDuY1v9RsIvcWL.jpg)'
        }
    }),
    frontground: CanvasManager.createCanvas({
        id: 'frontground',
        width: 3000,
        height: 1700,
        style: {
            zIndex: 2,
            width: '100%',
            background: 'radial-gradient(rgba(0,0,0,0.5) 0%, rgba(135,62,35,0.6) 100%)'
        }
    }),
    canvas2d: CanvasManager.createCanvas({
        id: 'canvas2d',
        width: 3000,
        height: 3000,
        style: {
            zIndex: 3,
            position: 'absolute',
            border: 'double red 5px',
            borderRadius: '15%',
            top: '5px',
            right: '5px',
            width: '20%',
            height: 'auto',
            opacity: '0.9',
            display: 'none'
        }
    })
};
export default canvases;
//# sourceMappingURL=canvases.js.map