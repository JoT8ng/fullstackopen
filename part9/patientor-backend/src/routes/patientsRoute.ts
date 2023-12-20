import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
    res.send(patientService.getAll());
});

patientRouter.get('/:id', (_req, res) => {
    const entry = patientService.findById(String(_req.params.id));

    if (entry) {
        res.send(entry);
    } else {
        res.sendStatus(404);
    }
});

patientRouter.post('/', (_req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(_req.body);
    
        const addedPatient = patientService.addPatient(newPatientEntry);
        res.json(addedPatient);
      } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default patientRouter;