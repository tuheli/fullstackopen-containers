import { Button, Grid, Input, InputLabel, TextField } from '@mui/material';
import { useState } from 'react';
import { Diagnosis, OccupationalHealthcareEntry } from '../../types';
import useDiagnosis from './useDiagnosis';
import SelectDiagnosisCodes from './SelectDiagnosisCodes';

interface Props {
  onCancel: () => void;
  onSubmit: (values: Omit<OccupationalHealthcareEntry, 'id'>) => void;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryForm = ({
  onCancel,
  onSubmit,
  diagnoses,
}: Props) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [employerName, setEmpolyerName] = useState<string>('');
  const [sickLeaveStart, setSickLeaveStart] = useState<string>('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>('');

  const { selected, handleChange } = useDiagnosis();

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      description,
      specialist,
      type: 'OccupationalHealthcare',
      diagnosisCodes: selected,
      employerName,
      sickLeave:
        sickLeaveStart && sickLeaveEnd
          ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
          : undefined,
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
          label="Employer name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmpolyerName(target.value)}
        />
        <InputLabel>Sick leave start date</InputLabel>
        <Input
          type="date"
          onChange={({ target }) => setSickLeaveStart(target.value)}
        ></Input>
        <InputLabel>Sick leave end date</InputLabel>
        <Input
          type="date"
          onChange={({ target }) => setSickLeaveEnd(target.value)}
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

export default OccupationalHealthcareEntryForm;
