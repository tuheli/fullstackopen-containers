import { useState, useEffect } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';
import { Diagnosis, Patient } from './types';
import patientService from './services/patients';
import diagnoseService from './services/diagnoses';
import PatientListPage from './components/PatientListPage';
import PatientPage from './components/PatientPage';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  console.log('RENDER APP');

  useEffect(() => {
    console.log('APP USE EFFECT FOR PATIENTS');

    patientService
      .getNonSensitiveEntries()
      .then((result) => setPatients(result));
  }, []);

  useEffect(() => {
    console.log('APP USE EFFECT FOR DIAGNOSES');

    diagnoseService.getDiagnoses().then((result) => setDiagnoses(result));
  }, []);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="/patients/:id"
            element={<PatientPage diagnoses={diagnoses} />}
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
