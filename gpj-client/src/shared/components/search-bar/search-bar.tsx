import React from 'react';
import { Search } from '@mui/icons-material';
import { Input, InputAdornment } from '@mui/material';

interface Props {
  onSearchTermChange: (searchTerm: string) => void;
}

export default function SearchBar({ onSearchTermChange }: Props) {
  return (
    <div className="flex flex-row bg-slate-200">
      <Input
        id="search"
        placeholder="Pesquisar..."
        onChange={(event) => {
          onSearchTermChange(event.target.value);
        }}
        startAdornment={(
          <InputAdornment position="start">
            <Search className="ml-2" />
          </InputAdornment>
        )}
      />
    </div>
  );
}
