import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Diagnosis, HospitalEntry } from '../../types';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import CircleIcon from '@mui/icons-material/Circle';

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const Hospital = ({ entry, diagnoses }: Props) => {
  return (
    <Box marginBottom={3} border={2} padding={1}>
      <Typography display="inline" marginRight={1}>
        {entry.date}
      </Typography>
      <BloodtypeIcon />
      <Typography>{entry.description}</Typography>
      <List>
        {entry.diagnosisCodes?.map((diagnosisCode) => (
          <ListItem
            key={diagnosisCode}
            sx={{ paddingTop: 0, paddingBottom: 0 }}
          >
            <ListItemIcon>
              <CircleIcon
                sx={{
                  fontSize: 'small',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={`${diagnosisCode} ${
                diagnoses.find((p) => p.code === diagnosisCode)?.name
              }`}
            />
          </ListItem>
        ))}
      </List>
      <Typography>{`Diagnose by ${entry.specialist}`}</Typography>
    </Box>
  );
};

export default Hospital;
