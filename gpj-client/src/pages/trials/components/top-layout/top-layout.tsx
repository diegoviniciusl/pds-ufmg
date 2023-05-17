import React from 'react';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { DelayedSearchBar } from '../../../../shared/components';

interface Props {
  onSearchTermChange: (searchTerm: string) => void,
  onOpenTrialsFilterModal: () => void;
  setIsCreateTrialModalOpen: (isCreateTrialModalOpen: boolean) => void,
  onDownloadTrialsCsv: () => void;
}

export default function TopLayout({
  onSearchTermChange, onOpenTrialsFilterModal, setIsCreateTrialModalOpen, onDownloadTrialsCsv,
}: Props) {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row">
        <div className="mr-5">
          <Button variant="contained" onClick={() => setIsCreateTrialModalOpen(true)}>
            Novo Processo
          </Button>
        </div>
        <Button onClick={onDownloadTrialsCsv}>
          <DownloadIcon className="mr-1" />
          Baixar Planilha
        </Button>
      </div>
      <div className="flex h-full flex-row">
        <Button variant="outlined" onClick={onOpenTrialsFilterModal}>
          Filtros
        </Button>
        <div className="ml-5"><DelayedSearchBar onSearchTermChange={onSearchTermChange} /></div>
      </div>
    </div>
  );
}
