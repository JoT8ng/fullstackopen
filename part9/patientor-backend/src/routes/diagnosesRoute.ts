import express from 'express';
import diagnosesService from '../services/diagnosesService';

const diagnoseRouter = express.Router();

diagnoseRouter.get('/', (_req, res) => {
    res.send(diagnosesService.getAll());
});

export default diagnoseRouter;