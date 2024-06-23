import CanvasManager from '../utils/rendering/CanvasManager.js';

const canvases = {
    
    canvas3d : CanvasManager.createCanvas({
        id : 'canvas3d',
        width : 300 * 2,
        height : 170 * 2,
        style : {
            width: '100%',
            zIndex : 2,
            'image-rendering': 'pixelated'
            //background: ' radial-gradient(transparent, rgba(0, 0, 0,1))'
        }
    }),
    
    background : CanvasManager.createCanvas({
        id : 'background',
        width : 3000 / 4,
        height : 1700 / 4,
        style : {
            zIndex : 1,
            width  : '100%',
            //background: "white"
            //background: "url(https://imgs.search.brave.com/VA0nM3tBtW4D_X9eWM1iUn-WYucWm_TaHWxQxxfFBek/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzM3LzgzLzgx/LzM2MF9GXzczNzgz/ODE4N19CUjM0NHpp/WlBqVWR0S3JnOFpI/SUE3UGQ3d2xtdUM2/OC5qcGc)"
            background: 'linear-gradient(180deg, rgba(125,213,205,1) 0%, rgba(155,100,50,0.9836309523809523) 50%)'
        }
    }),
    /*
    frontground : CanvasManager.createCanvas({
        id : 'frontground',
        width : 3000,
        height : 1700,
        style : {
            zIndex : 2,
            width  : '100%',
            //background: 'radial-gradient(rgba(0,0,0,0.4) 0%, rgba(135,62,35,0.5) 100%)'
        }
    }),*/
    
    canvas2d : CanvasManager.createCanvas({
        id : 'canvas2d',
        width : 100,
        height : 100,
        style : {
            zIndex : 3,
            position: 'absolute',            
            borderRadius: '50%',
            top: '5px',
            right: '5px',
            width: '20%',
            height: 'auto',
            opacity: '0.9',
            'image-rendering': 'pixelated'

            //display : 'none'
        }
    })
}

export default canvases