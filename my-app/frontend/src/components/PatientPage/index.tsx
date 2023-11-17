import { Box, Button, Typography } from '@mui/material';
import { Diagnosis, Entry, EntryType, Gender, Patient } from '../../types';
import { useMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { assertNever } from '../../utils';
import EntryDetails from '../Entries';
import AddEntryModal from '../AddEntryModal';
import { AxiosError } from 'axios';
import entryService from '../../services/entries';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [patient, setPatient] = useState<Patient>();
  const [type, setType] = useState<EntryType>();

  const match = useMatch('/patients/:id');
  const patientId = match?.params.id;

  const openModal = (type: EntryType): void => {
    setType(type);
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
    setType(undefined);
  };

  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Female:
        return <FemaleIcon></FemaleIcon>;
      case Gender.Male:
        return <MaleIcon></MaleIcon>;
      case Gender.Other:
        return null;
      default:
        return assertNever(gender);
    }
  };

  const submitNewEntry = async (values: Omit<Entry, 'id'>) => {
    if (!patient) {
      return;
    }

    try {
      const newEntry = await entryService.create(patient.id, values);
      const patientCopy = { ...patient };
      patientCopy.entries = patient.entries.concat(newEntry);
      setPatient(patientCopy);
      closeModal();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data);
      }
    }
  };

  useEffect(() => {
    if (!patientId) {
      return;
    }

    patientService.getById(patientId).then((data) => setPatient(data));
  }, [patientId]);

  if (!patient) {
    return null;
  }

  return (
    <Box marginTop={3}>
      <Typography
        component="h4"
        variant="h5"
        display={'inline'}
        marginRight={1}
      >
        {patient.name}
      </Typography>
      {getGenderIcon(patient.gender)}
      <Typography marginTop={2}>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>

      <Box marginTop={3} marginBottom={3}>
        <Typography>Add a new entry</Typography>
        <Button
          sx={{ marginRight: 1 }}
          type="button"
          variant="contained"
          onClick={() => openModal(EntryType.HealthCheck)}
        >
          Health Check
        </Button>
        <Button
          sx={{ marginRight: 1 }}
          type="button"
          variant="contained"
          onClick={() => openModal(EntryType.OccupationalHealthcare)}
        >
          Occupational
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={() => openModal(EntryType.Hospital)}
        >
          Hospital
        </Button>
      </Box>

      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={error}
        type={type}
        diagnoses={diagnoses}
      />

      <Typography component="h5" variant="h6" marginTop={2}>
        Entries
      </Typography>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </Box>
  );
};

export default PatientPage;
