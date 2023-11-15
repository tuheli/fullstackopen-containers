import patientData from '../../data/patients';
import { Patient, NewPatientEntry, NonSensitivePatient, Entry } from '../types';
import uuid = require('uuid');

const patients: Patient[] = patientData;

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getEntry = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid.v4(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientId: string, entry: Entry): Entry => {
  const patient = patients.find(p => p.id === patientId);

  if (!patient) {
    throw new Error(`Patient with id ${patientId} was not found`);
  }

  patient.entries.push(entry);
  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  getEntry,
  addPatient,
  addEntry,
};