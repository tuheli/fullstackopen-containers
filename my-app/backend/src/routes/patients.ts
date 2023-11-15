import express from "express";
import patientService from "../services/patients";
import { toNewPatientEntry, toNewEntry, parsePatientId } from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  res.status(200).send(patientService.getEntry(req.params['id']));
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.status(201).json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patientId = parsePatientId(req.body.patientId);
    const newEntry = toNewEntry(req.body.entry);
    const addedEntry = patientService.addEntry(patientId, newEntry);
    res.status(201).json(addedEntry);
  } catch (error) {
    let errorMessage = 'Error.';

    if (error instanceof Error) {
      errorMessage += ` ${error.message}`;
    }

    res.status(400).send(errorMessage);
  }
});

export default router;