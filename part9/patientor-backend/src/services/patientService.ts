import patientData from "../../data/patients";
import { patientEntry } from "../../types";

const patients: patientEntry[] = patientData;

const getAll = (): patientEntry[] => {
    return patients;
  };
  
  export default {
    getAll
  };