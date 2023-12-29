import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/toNewPatient';
import toNewEntry from '../utils/toNewEntry';

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

patientRouter.post('/:id/entries', (_req, res) => {
    try {
        const patient = patientService.findById(String(_req.params.id));
        if (patient === undefined) {
            res.status(400).send('patient not found');
            return;
        }
        const newEntry = toNewEntry(_req.body);
        const addedEntry = patientService.addEntry(patient, newEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default patientRouter;