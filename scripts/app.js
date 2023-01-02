'use strict';
/* --- Modules --- */
import meta from '../app/meta.js';
import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
/* --- Middlewares --- */
const PORT = 3900;
const app = express();
const __dirname = dirname(fileURLToPath(meta.url));
console.log(__dirname);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//views
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejstrings');
// routes
// public
app.use(express.static(join(__dirname, 'public')));
/* --- Server & DataBase connection --- */
app.listen(PORT, () => {
    console.log('The server is listening on port', PORT);
});
