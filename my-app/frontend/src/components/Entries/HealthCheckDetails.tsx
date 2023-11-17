import { Box, Typography } from '@mui/material';
import { HealthCheckEntry, HealthCheckRating } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { assertNever } from '../../utils';

interface Props {
  entry: HealthCheckEntry;
}

const HealthCheckDetails = ({ entry }: Props) => {
  const getHeartColor = (healthCheckRating: HealthCheckRating) => {
    switch (healthCheckRating) {
      case HealthCheckRating.Healthy:
        return 'green';
      case HealthCheckRating.LowRisk:
        return 'yellow';
      case HealthCheckRating.HighRisk:
        return 'red';
      case HealthCheckRating.CriticalRisk:
        return 'black';
      default:
        return assertNever(healthCheckRating);
    }
  };

  return (
    <Box marginBottom={3} border={2} padding={1}>
      <Typography display="inline" marginRight={1}>
        {entry.date}
      </Typography>
      <LocalHospitalIcon />
      <Typography>{entry.description}</Typography>
      <FavoriteIcon sx={{ color: getHeartColor(entry.healthCheckRating) }} />
      <Typography>{`Diagnose by ${entry.specialist}`}</Typography>
    </Box>
  );
};

export default HealthCheckDetails;
