import { Diagnosis, Entry } from '../../types';
import { assertNever } from '../../utils';
import HealthCheckDetails from './HealthCheckDetails';
import Hospital from './HospitalDetails';
import OccupationalHealthcareDetails from './OccupationalHealthcareDetails';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareDetails entry={entry} />;
    case 'Hospital':
      return <Hospital entry={entry} diagnoses={diagnoses} />;
    case 'HealthCheck':
      return <HealthCheckDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
