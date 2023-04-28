import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dateHelper from '../../utils/date-helper';

interface Props {
  label: string;
  onChange: (date: string) => void;
  value?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
}

export default function DatePickerInput({
  label, onChange, value, error, helperText, required,
}: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value ? dayjs(value) : null}
        inputFormat="DD/MM/YYYY"
        onChange={(newValue) => {
          onChange(dateHelper.getStandardizedDate(newValue));
        }}
        renderInput={(params) => (
          <TextField
            fullWidth
            variant="standard"
            error={error}
            helperText={helperText}
            inputProps={{ ...params.inputProps, readOnly: true }}
            required={required}
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
}
