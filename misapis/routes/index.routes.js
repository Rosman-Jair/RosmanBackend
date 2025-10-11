import ejemplo from './ejemplo.routes.js';
import { Router } from 'express';
const indexRosman = Router();

indexRosman.use('/ejemplo', ejemplo);

export default indexRosman;