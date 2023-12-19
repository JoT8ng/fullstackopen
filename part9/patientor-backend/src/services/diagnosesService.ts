import diagnosesData from "../../data/diagnoses";
import { DiagnoseEntry } from "../../types";

const diagnoses: DiagnoseEntry[] = diagnosesData;

const getAll = (): DiagnoseEntry[] => {
  return diagnoses;
};

export default {
  getAll
};