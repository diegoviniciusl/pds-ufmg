import React, {
  useCallback, useEffect, useState,
} from 'react';
import {
  CreateTrialAttributes, DeleteTrialAttributes, GetTrialsAttributes, SortDirection, TrialOrderableKeys, UpdateTrialAttributes,
} from '../../interfaces';
import TrialsFilterAttributes from '../../interfaces/trials/trials-filter-attributes';
import { Trial } from '../../models';
import { TrialStatus } from '../../shared/enums';
import { CreateTrialModal } from './components';
import TrialsFilterModal from './components/trials-filter-modal/trials-filter-modal';
import TopLayout from './components/top-layout/top-layout';
import TrialsTable from './components/trials-table/trials-table';
import ViewTrialModal from './components/view-trial-modal/view-trial-modal';
import trialsService from './services/trials-service';

export default function Trials() {
  const [isCreateTrialModalOpen, setIsCreateTrialModalOpen] = useState<boolean>(false);
  const [isViewTrialModalOpen, setIsViewTrialModalOpen] = useState<boolean>(false);
  const [isTrialsFilterModalOpen, setIsTrialsFilterModalOpen] = useState<boolean>(false);
  const [trials, setTrials] = useState<Trial[]>([]);
  const [selectedTrial, setSelectedTrial] = useState<Trial | null>(null);
  const [loadingTrials, setLoadingTrials] = useState<boolean>(true);
  const [trialsFilterAttributes, setTrialsFilterAttributes] = useState<TrialsFilterAttributes | undefined>(undefined);
  const [trialsSearchTerm, setTrialsSearchTerm] = useState<string>('');
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('asc');
  const [orderByKey, setOrderByKey] = React.useState<keyof Trial>('status');

  const closeViewTrialModal = () => {
    setSelectedTrial(null);
    setIsViewTrialModalOpen(false);
  };

  const openViewTrialModal = (trial: Trial) => {
    setSelectedTrial(trial);
    setIsViewTrialModalOpen(true);
  };

  const fetchTrialsData = useCallback(async () => {
    setLoadingTrials(true);
    let getTrialsAttributes: GetTrialsAttributes = {
      search: trialsSearchTerm.length > 0 ? trialsSearchTerm : undefined,
      orderByColumn: trialsService.getTrialOrderableColumnFromTrialKey(orderByKey as keyof TrialOrderableKeys),
      orderByDirection: sortDirection,
    };

    if (trialsFilterAttributes) getTrialsAttributes = { ...getTrialsAttributes, ...trialsFilterAttributes };

    const fetchedTrials = await trialsService.getTrials(getTrialsAttributes).catch(() => []);
    setTrials(fetchedTrials);

    setLoadingTrials(false);
  }, [trialsFilterAttributes, trialsSearchTerm, orderByKey, sortDirection]);

  const handleCreateTrial = async (createTrialAttributes: CreateTrialAttributes) => {
    await trialsService.createTrial(createTrialAttributes).then((createdTrial) => {
      setTrials([...trials, createdTrial]);
      setIsCreateTrialModalOpen(false);
    }).catch(() => {
      setIsCreateTrialModalOpen(true);
    });
  };

  const handleUpdateTrial = async (updateTrialAttributes: UpdateTrialAttributes) => {
    await trialsService.updateTrial(updateTrialAttributes).then((updatedTrial) => {
      const updatedTrials = trials.map((trial) => {
        if (trial.trialId === updatedTrial.trialId) return updatedTrial;
        return trial;
      });

      setTrials(updatedTrials);
      closeViewTrialModal();
    }).catch(() => {
      setIsViewTrialModalOpen(true);
    });
  };

  const handleUpdateTrialStatus = async (trialStatus: TrialStatus) => {
    if (!selectedTrial) return;

    const updateTrialAttributes: UpdateTrialAttributes = { trialId: selectedTrial.trialId, status: trialStatus };

    const updatedTrial = await trialsService.updateTrial(updateTrialAttributes);
    setSelectedTrial(updatedTrial);
    await fetchTrialsData();
  };

  const handleDeleteTrial = async (deleteTrialAttributes: DeleteTrialAttributes) => {
    await trialsService.deleteTrial(deleteTrialAttributes);

    const trialsAfterDelete = trials.filter((trial) => trial.trialId !== deleteTrialAttributes.trialId);

    setTrials(trialsAfterDelete);
    closeViewTrialModal();
  };

  useEffect(() => {
    fetchTrialsData();
  }, [fetchTrialsData, trialsFilterAttributes, trialsSearchTerm, orderByKey, sortDirection]);

  return (
    <div className="w-full">
      {selectedTrial && (
        <ViewTrialModal
          isOpen={isViewTrialModalOpen}
          onClose={closeViewTrialModal}
          trial={selectedTrial}
          updateTrialStatus={handleUpdateTrialStatus}
          updateTrial={handleUpdateTrial}
          deleteTrial={handleDeleteTrial}
        />
      )}

      <CreateTrialModal
        isOpen={isCreateTrialModalOpen}
        onClose={() => setIsCreateTrialModalOpen(false)}
        createTrial={handleCreateTrial}
      />

      <TrialsFilterModal
        isOpen={isTrialsFilterModalOpen}
        onClose={() => setIsTrialsFilterModalOpen(false)}
        onTrialsFilterModalChange={(filterAttributes) => setTrialsFilterAttributes(filterAttributes)}
      />

      <div className="w-full mb-5">
        <TopLayout
          onOpenTrialsFilterModal={() => setIsTrialsFilterModalOpen(true)}
          setIsCreateTrialModalOpen={setIsCreateTrialModalOpen}
          onSearchTermChange={(searchTerm) => setTrialsSearchTerm(searchTerm)}
          onDownloadTrialsCsv={trialsService.downloadTrialsCsv}
        />
      </div>

      <div className="max-w-full">
        <TrialsTable
          trials={trials}
          loadingTrials={loadingTrials}
          onSelectTrial={openViewTrialModal}
          orderByKey={orderByKey}
          setOrderByKey={setOrderByKey}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      </div>
    </div>
  );
}
