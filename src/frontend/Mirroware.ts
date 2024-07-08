import app                from './Initializer.js';
import CONFIG             from './config.js';
import { camera } from './utils/scene/Camera.js';
import Vector2D           from './utils/physics/Vector2D.js';
import SceneBuilder       from './utils/scene/SceneBuilder.js';

// Initialize camera

camera.init(app,{
    x : 17,
    y:  17,
    dx: 0,
    dy: 1,
    fov : 100.1
});

// Define and create scene

const scene = [
   
    { type:'Wall', info:[[2,2],[4,2],   1, '255,0,0'         ]},
    { type:'Wall', info:[[2,2],[2,4],   1, '0,255,0'         ]},

    { type : 'Circle', info:[camera.pos, 1,'0,100,0'          ]},
    //{ type:'Wall', info:[[-1,2],[1,2],   1, '255,255,0'         ]},
    //{ type:'Wall', info:[[-3.57,3],[3.57,3],   1, '0,255,0'         ]},

    
    { type : 'Circle', info:[camera.pos, 0.5,'0,100,0'          ]},
 
    { type:'Wall', info:[[5,5],[5,25],   1, '255,255,0'         ]},
    { type:'Wall', info:[[10,5],[10,-20],   1, '0,255,0'        ]},
    { type:'Wall', info:[[12,5],[12,-20],   1, '255,0,0'        ]},
    { type:'Wall', info:[[5, -24],[5, -25], 1, '255,0,100'      ]},
    { type:'Wall', info:[[5, -21],[5, -20], 1, '0,255,100'      ]},    
    { type:'Wall', info:[[5, -21],[-20, -21], 1, '0,255,0'      ]},    
    { type:'Wall', info:[[5, -24],[-20, -24], 1, '255,0,100'    ]},    
    { type:'Wall', info:[[5, -20],[10, -20], 1, '0,255,100'     ]},
    { type:'Wall', info:[[12, -20],[25, -20], 1, '0,255,100'    ]},
    { type:'Wall', info:[[5,-25],[35,-25], 1, '255,157,0'       ]},
    { type:'Wall', info:[[25,-20],[25,-25], 1, '255,157,0'      ]},
    { type:'Wall', info:[[-25,-20],[-25,-25], 1, '255,157,0'    ]},
    { type:'Wall', info:[[5, 5],[10, 5], 1, '0,255,100'         ]},
    { type:'Wall', info:[[12, 5],[25, 5], 1, '0,255,100'        ]},
    { type:'Wall', info:[[5, 7],[7, 7],  1, '0,255,100'         ]},
    { type:'Wall', info:[[7, 5],[7, 7],  1, '37, 190, 42'       ]},
    { type:'Wall', info:[[7, 14],[7, 20],  1, '0,155,200'       ]},
    { type:'Wall', info:[[7, 20],[15, 20],  1, '255,46,87'      ]},
    { type:'Wall', info:[[7, 15],[15, 15],  0.05, '0,100,100'   ]},
    { type:'Wall', info:[[7, 19],[15, 19],  0.05, '255,46,87'   ]},
    { type:'Wall', info:[[7, 14],[15, 14],  1, '0,100,100'      ]},
    { type:'Wall', info:[[15, 15],[15, 14],  1, '0,100,100'     ]},
    { type:'Wall', info:[[15, 19],[15, 20],  1, '255,46,87'     ]},
    { type:'Wall', info:[[25,5],[25,25], 1, '150,150,150'       ]},
    { type:'Wall', info:[[5,25],[25,25], 0.1, '255,255,255'     ]},
    { type:'Wall', info:[[15,7],[17,7], 1, '255,0,255'          ]},
    { type:'Wall', info:[[15,7],[15,10], 1, '255,155,255'       ]},
    { type:'Wall', info:[[15,10],[15.5,10], 1, '255,155,200'    ]},
    { type:'Wall', info:[[17,7],[17,10],1, '255,155,255'        ]},
    { type:'Wall', info:[[16.5,7],[16.5,10],1, '255,155,255'    ]},
    { type:'Wall', info:[[16.5,10],[17,10],1, '255,155,200'     ]},
    { type:'Wall', info:[[19, 12],[22, 12],  0.1, '0,255,100'   ]},
    { type:'Wall', info:[[19, 15],[22, 15],  0.1, '0,255,100'   ]},
    { type:'Wall', info:[[22, 12],[22, 15],  1, '255,157,0'     ]},
    { type:'Wall', info:[[19, 12],[19, 15],  1, '255,157,0'     ]},

    //{ type : 'Circle', info:[{ x : 10, y : 17}, 1,'255,46,87'   ]},
    //{ type : 'Circle', info:[{ x : 20, y : 10}, 3,'255,46,87'   ]},
    //{ type : 'Circle', info:[{ x : 20, y : 19}, 0.5,'0,86,46'   ]},
    
    ];

const sceneBuilder = new SceneBuilder(app);

sceneBuilder.build(scene);

/* ------ Debugging commands (Not for production) ------- */

const commands = {
    'o' : () => { console.log(app) },
    'c' : () => { console.log(camera)},
    'p' : () => { 
        app.pauseExecution(); 
        console.log('execution paused');
    },
    'r' : () => {
        app.pause = false;
        app.execute();
        console.log('execution resumed');
    }   
}

window.addEventListener('keydown', (e) => {

    if(commands[e.key]) commands[e.key]();
});

// execute

app.execute();