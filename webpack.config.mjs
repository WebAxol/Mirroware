import { fileURLToPath } from "url";
import TerserPlugin from "terser-webpack-plugin";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    entry   : "./lib/Mirroware.js",
    output  : {
        path : path.resolve(__dirname,'dist'),
        filename : 'Mirroware.min.js'
    },
    resolve : {
        alias : {
            "/pluglightjs/World.js" : path.resolve(__dirname,'vendor/pluglightjs/World.js')
        }
    },
    optimization : {
        minimize : true,
        minimizer : [new TerserPlugin() ]
    } 
};