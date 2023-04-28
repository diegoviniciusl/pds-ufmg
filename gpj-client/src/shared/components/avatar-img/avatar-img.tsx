/* eslint-disable no-bitwise */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Avatar from '@mui/material/Avatar';
import avatarImgService from './services/avatar-img-service';

interface Props {
  name: string;
  size?: number;
}

const avatarConfig = (name: string, size: number) => ({
  sx: {
    bgcolor: avatarImgService.stringToColor(name),
    margin: 'auto',
    width: size,
    height: size,
  },
  children: <span style={{ fontSize: size / 2 }}>{avatarImgService.stringToLetters(name).toUpperCase()}</span>,
});

export default function AvatarImg({ name, size = 40 }: Props) {
  return (
    <div className="flex w-full">
      <Avatar {...avatarConfig(name, size)} />
    </div>
  );
}
