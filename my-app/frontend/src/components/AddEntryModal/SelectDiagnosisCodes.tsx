import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Diagnosis } from '../../types';

interface Props {
  selected: Array<Diagnosis['code']>;
  diagnoses: Diagnosis[];
  handleChange: (event: SelectChangeEvent<string[]>) => void;
}

const SelectDiagnosisCodes = ({ diagnoses, selected, handleChange }: Props) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="diagnoses-multiple-chip-label">Diagnoses</InputLabel>
      <Select
        labelId="diagnoses-multiple-chip-label"
        id="diagnoses-multiple-chip"
        multiple
        value={selected}
        onChange={handleChange}
        input={
          <OutlinedInput
            id="select-diagnoses-multiple-chip"
            label="Diagnoses"
          />
        }
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {diagnoses.map(({ code, name }) => (
          <MenuItem key={code} value={code}>
            {code} {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectDiagnosisCodes;
