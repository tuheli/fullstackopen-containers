import patientService from "./services/patients";
import { Diagnosis, Entry, Gender, HealthCheckRating, NewPatientEntry } from "./types";
import { v4 as uuidv4 } from 'uuid';

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object) {
    const newEntry: NewPatientEntry = {
      ssn: parseSsn(object.ssn),
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export const toNewEntry = (object: unknown): Entry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (!('type' in object) || !isString(object.type)) {
    throw new Error("Incorrect or missing data");
  }

  switch (object.type) {
    case 'Hospital':
      return toNewHospitalEntry(object);
    case 'OccupationalHealthcare':
      return toNewOccupationalHealthcareEntry(object);
    case 'HealthCheck':
      return toNewHealthCheckEntry(object);
    default:
      assertNever(object.type as never);
  }

  throw new Error("Invalid or missing data");
};

const toNewHealthCheckEntry = (object: unknown): Entry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (!('date' in object) || !object.date) {
    throw new Error("Missing date");
  }

  if (!('description' in object) || !object.description) {
    throw new Error("Missing description");
  }

  if (!('specialist' in object) || !object.specialist) {
    throw new Error("Missing specialist");
  }

  if (!('type' in object) || !object.type) {
    throw new Error("Missing type");
  }

  if (!('healthCheckRating' in object)) {
    throw new Error("Missing health check rating");
  }

  const newEntry: Entry = {
    type: 'HealthCheck',
    date: parseDate(object.date),
    description: parseDescription(object.description),
    specialist: parseSpecialist(object.specialist),
    id: uuidv4(),
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    diagnosisCodes: 'diagnosisCodes' in object ? parseDiagnosisCodes(object) : undefined,
  };

  return newEntry;
};

const toNewHospitalEntry = (object: unknown): Entry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (!('date' in object)) {
    throw new Error("Missing date");
  }

  if (!('description' in object)) {
    throw new Error("Missing description");
  }

  if (!('specialist' in object)) {
    throw new Error("Missing specialist");
  }

  if (!('type' in object)) {
    throw new Error("Missing type");
  }

  if (!('discharge' in object)) {
    throw new Error("Missing discharge");
  }

  const newEntry: Entry = {
    type: 'Hospital',
    discharge: parseDischarge(object.discharge),
    date: parseDate(object.date),
    description: parseDescription(object.description),
    specialist: parseSpecialist(object.specialist),
    id: uuidv4(),
    diagnosisCodes: 'diagnosisCodes' in object ? parseDiagnosisCodes(object) : undefined,
  };

  return newEntry;
};

const toNewOccupationalHealthcareEntry = (object: unknown): Entry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (!('date' in object)) {
    throw new Error('Missing date');
  }

  if (!('description' in object)) {
    throw new Error('Missing description');
  }

  if (!('specialist' in object)) {
    throw new Error('Missing specialist');
  }

  if (!('type' in object)) {
    throw new Error('Missing type');
  }

  if (!('employerName' in object)) {
    throw new Error('Missing employer name');
  }

  const newEntry: Entry = {
    id: uuidv4(),
    date: parseDate(object.date),
    description: parseDescription(object.description),
    specialist: parseSpecialist(object.specialist),
    type: 'OccupationalHealthcare',
    diagnosisCodes: 'diagnosisCodes' in object ? parseDiagnosisCodes(object) : undefined,
    employerName: parseEmployerName(object.employerName),
    sickLeave: 'sickLeave' in object ? parseSickLeave(object.sickLeave) : undefined
  };

  return newEntry;
};

export const parsePatientId = (patientId: unknown): string => {
  if (!patientId || !isString(patientId)) {
    throw new Error("Invalid patient id");
  }

  if (!patientService.getEntries().find(p => p.id === patientId)) {
    throw new Error("Patient not found");
  }

  return patientId;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isNumber(healthCheckRating)) {
    throw new Error("Invalid or missing health check rating");
  }

  if (!isHealthCheckRating(healthCheckRating)) {
    throw new Error("Invalid or missing health check rating");
  }

  return healthCheckRating;
};

const parseDischarge = (discharge: unknown): { date: string, criteria: string } => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error("Invalid or missing discharge");
  }

  if (!('date' in discharge) || !isString(discharge.date) || !isDate(discharge.date)) {
    throw new Error("Invalid or missing date");
  }

  if (!('criteria' in discharge) || !isString(discharge.criteria) || !discharge.criteria) {
    throw new Error("Invalid or missing criteria");
  }

  return {
    criteria: discharge.criteria,
    date: discharge.date
  };
};

const parseSickLeave = (sickLeave: unknown): { startDate: string, endDate: string } => {
  if (!sickLeave || typeof sickLeave !== 'object') {
    throw new Error('Incorrect or missing sick leave');
  }

  if ('startDate' in sickLeave && isString(sickLeave.startDate) && 'endDate' in sickLeave && isString(sickLeave.endDate)) {
    return {
      startDate: sickLeave.startDate,
      endDate: sickLeave.endDate
    };
  }

  throw new Error('Incorrect or missing sick leave');
};

const parseEmployerName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Invalid or missing employer name");
  }

  return name;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Invalid or missing specialist");
  }

  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Invalid or missing description");
  }

  return description;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  const centuryDigit = ssn[6];

  if (!(centuryDigit === '-' || centuryDigit === 'A' || centuryDigit === '+')) {
    throw new Error('Incorrect or missing ssn');
  }

  let century: number;
  switch (centuryDigit) {
    case '+':
      century = 18;
      break;
    case "-":
      century = 19;
      break;
    case "A":
      century = 20;
      break;
  }

  const dd = ssn.slice(0, 2);
  const mm = ssn.slice(2, 4);
  const yy = ssn.slice(4, 6);

  if (!isDate(`${century}${yy}-${mm}-${dd}`)) {
    throw new Error('Incorrect or missing ssn');
  }

  const personalNumberPadded = ssn.slice(7, 10).padStart(3, '0');
  const personalNumber = parseInt(personalNumberPadded);

  if (isNaN(personalNumber) || personalNumber < 2 || personalNumber > 899) {
    throw new Error('Incorrect or missing ssn');
  }

  const checkNumber = parseInt(`${dd}${mm}${yy}${personalNumberPadded}`);
  const checkDigit = ssn[10];

  if (!isValidCheckDigit(checkDigit, checkNumber)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

const isValidCheckDigit = (checkDigit: string, personalNumber: number): boolean => {
  const checkDigits = [...'0123456789ABCDEFHJKLMNPRSTUVWXY'];

  if (!checkDigits.includes(checkDigit)) {
    throw new Error('Incorrect or missing ssn');
  }

  const division = personalNumber / 31;
  const decimalPart = '0.' + division.toString().split('.')[1];
  const index = Math.round(parseFloat(decimalPart) * 31);

  if (index < 0 || index > checkDigits.length - 1) {
    throw new Error('Incorrect or missing ssn');
  }

  const correctCheckDigit = checkDigits[index];

  return checkDigit === correctCheckDigit;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(v => v).includes(param);
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
