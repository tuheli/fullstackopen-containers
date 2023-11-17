import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
} from '@mui/material';
import HealthcheckEntryForm from './HealthcheckEntryForm';
import { Diagnosis, EntryFormValues, EntryType } from '../../types';
import { assertNever } from '../../utils';
import OccupationalHealthcareEntryForm from './OccupationalHealthcareEntryForm';
import HospitalEntryForm from './HospitalEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  type: EntryType | undefined;
  diagnoses: Diagnosis[];
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  type,
  diagnoses,
}: Props) => {
  const getForm = (type: EntryType) => {
    switch (type) {
      case EntryType.OccupationalHealthcare:
        return (
          <OccupationalHealthcareEntryForm
            onSubmit={onSubmit}
            onCancel={onClose}
            diagnoses={diagnoses}
          />
        );
      case EntryType.Hospital:
        return (
          <HospitalEntryForm
            onSubmit={onSubmit}
            onCancel={onClose}
            diagnoses={diagnoses}
          />
        );
      case EntryType.HealthCheck:
        return (
          <HealthcheckEntryForm
            onSubmit={onSubmit}
            onCancel={onClose}
            diagnoses={diagnoses}
          />
        );
      default:
        return assertNever(type as never);
    }
  };

  if (type === undefined) {
    return null;
  }

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        {getForm(type)}
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
