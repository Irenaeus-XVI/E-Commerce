//NOTE - import dotenv
import * as dotenv from 'dotenv';
//NOTE - configurations 
dotenv.config();
import morgan from 'morgan';
import express from 'express'
import { connection } from './database/dbConnection.js';
import { bootstrap } from './src/bootstrap.js'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json());
app.use(morgan('dev'))
app.use(express.static('uploads'))
connection();
bootstrap(app);

app.listen(process.env.PORT || 4000, () => console.log(`Server listening on port ${process.env.PORT}!`))