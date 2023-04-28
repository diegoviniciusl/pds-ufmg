import React, { useEffect, useState } from 'react';
import { Search } from '@mui/icons-material';
import { Input, InputAdornment } from '@mui/material';

interface Props {
  onSearchTermChange: (searchTerm: string) => void;
}

export default function DelayedSearchBar({ onSearchTermChange }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearchTermChange(searchTerm);
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearchTermChange]);

  return (
    <div className="flex flex-row bg-slate-200">
      <Input
        id="search"
        placeholder="Pesquisar..."
        onChange={(event) => setSearchTerm(event.target.value)}
        startAdornment={(
          <InputAdornment position="start">
            <Search className="ml-2" />
          </InputAdornment>
        )}
      />
    </div>
  );
}
