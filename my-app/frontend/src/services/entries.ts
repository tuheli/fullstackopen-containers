import axios from "axios";
import { Entry } from "../types";
import { apiBaseUrl } from "../constants";

const create = async (patientId: string, entry: Omit<Entry, 'id'>) => {
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${patientId}/entries`, { patientId, entry });

  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { create }