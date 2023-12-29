/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientData from "../../data/patients";
import { Entry, EntryWithoutId, NewPatientEntry, patientEntry, selectPatientEntry } from "../../types";
import { v4 as uuidv4 } from 'uuid';

const patients: selectPatientEntry[] = patientData.map(
    ({ id, name, dateOfBirth, ssn, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
        entries
    })
);

const getAll = (): selectPatientEntry[] => {
    return patientData;
  };

const findById = (id: string): patientEntry | undefined => {
  return patientData.find(d => d.id === id);
};

const addPatient = ( entry: NewPatientEntry ): patientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = ( patient: patientEntry, entry: EntryWithoutId ): Entry => {
  const newEntry = {
    id: uuidv4(),
    ...entry
  };
  patient.entries.push(newEntry);
  return newEntry;
};
  
export default {
  getAll,
  findById,
  addPatient,
  addEntry
};