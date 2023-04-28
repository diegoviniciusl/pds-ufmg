import React from 'react';
import { Typography } from '@mui/material';

interface Props {
  text: string | null | undefined;
  description: string;
  boldDescription?: boolean
}

export default function DetailsViewField({ text, description, boldDescription = false }: Props) {
  return (
    <div className="flex flex-col mb-2">
      {text ? (
        <>
          <Typography noWrap variant="caption">{description}</Typography>
          <Typography noWrap variant={`${boldDescription ? 'h4' : 'body1'}`}>{text}</Typography>
        </>
      ) : (
        <>
          <Typography noWrap variant="caption">{description}</Typography>
          <Typography noWrap variant={`${boldDescription ? 'h4' : 'body1'}`}>Não informado</Typography>
        </>
      )}
    </div>
  );
}
