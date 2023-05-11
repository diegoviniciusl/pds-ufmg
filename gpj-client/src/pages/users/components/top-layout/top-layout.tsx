import React from 'react';
import { Button } from '@mui/material';
import SearchBar from '../../../../shared/components/search-bar/search-bar';

interface Props {
  onSearchTermChange: (searchTerm: string) => void,
  setIsCreateUserModalOpen: (isCreateUserModalOpen: boolean) => void,
}

export default function TopLayout({ onSearchTermChange, setIsCreateUserModalOpen }: Props) {
  return (
    <div className="flex flex-row justify-between">
      <Button variant="contained" onClick={() => setIsCreateUserModalOpen(true)}>
        Novo Usuário
      </Button>
      <div className="h-full">
        <SearchBar onSearchTermChange={onSearchTermChange} />
      </div>
    </div>
  );
}
