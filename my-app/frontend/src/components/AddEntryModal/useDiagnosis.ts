import { SelectChangeEvent } from "@mui/material";
import { Diagnosis } from "../../types";
import { useState } from "react";

const useDiagnosis = () => {
  const [selected, setSelected] = useState<
    Array<Diagnosis['code']>
  >([]);

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const {
      target: { value },
    } = event;

    setSelected(typeof value === 'string' ? value.split(',') : value);
  };

  return ({
    selected,
    handleChange
  })
}

export default useDiagnosis;