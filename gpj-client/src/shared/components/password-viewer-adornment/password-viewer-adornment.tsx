import React from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Props {
  isPasswordVisible: boolean;
  setIsPasswordVisible: (isPasswordVisible : boolean) => void;
}

export default function PasswordViewerAdornment(
  { isPasswordVisible, setIsPasswordVisible }: Props,
) {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        edge="end"
      >
        {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
}
