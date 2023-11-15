import { Button, Grid, Input, InputLabel, TextField } from '@mui/material';
import { useState } from 'react';
import { Diagnosis, HospitalEntry } from '../../types';
import SelectDiagnosisCodes from './SelectDiagnosisCodes';
import useDiagnosis from './useDiagnosis';

interface Props {
  onCancel: () => void;
  onSubmit: (values: Omit<HospitalEntry, 'id'>) => void;
  diagnoses: Diagnosis[];
}

const HospitalEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [criteria, setCriteria] = useState<string>('');
  const [dischargeDate, setdischargeDate] = useState<string>('');

  const { selected, handleChange } = useDiagnosis();

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      description,
      specialist,
      type: 'Hospital',
      diagnosisCodes: selected,
      discharge: { criteria, date: dischargeDate },
    });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel>Date</InputLabel>
        <Input
          type="date"
          onChange={({ target }) => setDate(target.value)}
        ></Input>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <SelectDiagnosisCodes
          diagnoses={diagnoses}
          selected={selected}
          handleChange={handleChange}
        />
        <TextField
          label="Discharge criteria"
          fullWidth
          value={criteria}
          onChange={({ target }) => setCriteria(target.value)}
        />
        <InputLabel>Discharge date</InputLabel>
        <Input
          type="date"
          onChange={({ target }) => setdischargeDate(target.value)}
        ></Input>
        <Grid>
          <Grid item>
            <Button
              type="button"
              onClick={onCancel}
              sx={{ float: 'left' }}
              variant="contained"
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button type="submit" sx={{ float: 'right' }} variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default HospitalEntryForm;
