import React from 'react';
import { Button } from '@mui/material';
import SearchBar from '../../../../shared/components/search-bar/search-bar';

interface Props {
  onSearchTermChange: (searchTerm: string) => void,
  setIsCreateCompanyModalOpen: (isCreateCompanyModalOpen: boolean) => void,
}

export default function TopLayout({ onSearchTermChange, setIsCreateCompanyModalOpen }: Props) {
  return (
    <div className="flex flex-row justify-between">
      <Button variant="contained" onClick={() => setIsCreateCompanyModalOpen(true)}>
        Nova Empresa
      </Button>
      <div className="h-full">
        <SearchBar onSearchTermChange={onSearchTermChange} />
      </div>
    </div>
  );
}
