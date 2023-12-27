import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getDiagnose = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/api/diagnoses`
  );

  return data;
};

export default {
  getDiagnose
};