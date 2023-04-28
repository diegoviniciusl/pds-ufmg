import React from 'react';
import { Typography } from '@mui/material';

interface Props {
  text: string;
}

export default function DatailsViewTitle({ text }: Props) {
  return (
    <div className="flex flex-row items-center w-full h-7 mb-6">
      <div className="w-2 h-7 mr-2 bg-purple-main rounded" />
      <Typography noWrap variant="h3">{text}</Typography>
    </div>
  );
}
