/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientData from "../../data/patients";
import { NewPatientEntry, patientEntry, selectPatientEntry } from "../../types";
import { v4 as uuidv4 } from 'uuid';

const patients: selectPatientEntry[] = patientData.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    })
);

const getAll = (): selectPatientEntry[] => {
    return patients;
  };

const findById = (id: string): selectPatientEntry | undefined => {
  return patients.find(d => d.id === id);
};

const addPatient = ( entry: NewPatientEntry ): patientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};
  
export default {
  getAll,
  findById,
  addPatient
};