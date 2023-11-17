import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { Diagnosis, HealthCheckEntry, HealthCheckRating } from '../../types';
import useDiagnosis from './useDiagnosis';
import SelectDiagnosisCodes from './SelectDiagnosisCodes';

interface Props {
  onCancel: () => void;
  onSubmit: (values: Omit<HealthCheckEntry, 'id'>) => void;
  diagnoses: Diagnosis[];
}

const HealthcheckEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const { selected, handleChange } = useDiagnosis();

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      description,
      healthCheckRating: parseInt(healthCheckRating),
      specialist,
      type: 'HealthCheck',
      diagnosisCodes: selected,
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
          autoComplete="off"
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          autoComplete="off"
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
        <FormControl fullWidth>
          <InputLabel id="health-rating-input">Health check rating</InputLabel>
          <Select
            labelId="health-rating-input"
            id="set-health-rating"
            value={healthCheckRating}
            label="Health check rating"
            onChange={({ target }) => setHealthCheckRating(target.value)}
          >
            <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
            <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
            <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
            <MenuItem value={HealthCheckRating.CriticalRisk}>
              Critical Risk
            </MenuItem>
          </Select>
        </FormControl>
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

export default HealthcheckEntryForm;
