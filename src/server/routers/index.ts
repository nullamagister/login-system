import express, { Router } from 'express';
import System from '../../controller/System';
import Server from '../server';

const router: Router = express.Router();
let system: System; 

setImmediate(() => system = Server.getSystem());

// TODO

export default router;