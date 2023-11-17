import { Box, Typography } from '@mui/material';
import { OccupationalHealthcareEntry } from '../../types';
import WorkIcon from '@mui/icons-material/Work';

interface Props {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareDetails = ({ entry }: Props) => {
  return (
    <Box marginBottom={3} border={2} padding={1}>
      <Typography display="inline" marginRight={1}>
        {entry.date}
      </Typography>
      <WorkIcon />
      <Typography display="inline" marginLeft={1}>
        {entry.employerName}
      </Typography>
      <Typography>{entry.description}</Typography>
      <Typography>{`Diagnose by ${entry.specialist}`}</Typography>
    </Box>
  );
};

export default OccupationalHealthcareDetails;
