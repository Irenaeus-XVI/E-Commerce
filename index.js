//NOTE - import dotenv
import * as dotenv from 'dotenv';
//NOTE - configurations 
dotenv.config();

import express from 'express'
import { connection } from './database/dbConnection.js';

import { bootstrap } from './src/bootstrap.js'
const app = express()
const port = 4000;
app.use(express.json());
connection();
bootstrap(app);

app.listen(port, () => console.log(`Server listening on port ${port}!`))