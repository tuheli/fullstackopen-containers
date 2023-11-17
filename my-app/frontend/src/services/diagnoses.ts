import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

const getDiagnoses = async () => {
  const result = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

  return result.data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getDiagnoses }