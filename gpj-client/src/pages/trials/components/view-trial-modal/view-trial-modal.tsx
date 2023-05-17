import React, { useState } from 'react';
import { DeleteTrialAttributes, UpdateTrialAttributes } from '../../../../interfaces';
import { Trial } from '../../../../models';
import { Modal } from '../../../../shared/components';
import { TrialStatus } from '../../../../shared/enums';
import TrialDetailsModalContent from '../trial-details-modal-content/trial-details-modal-content';
import TrialDetailsModalTitle from '../trial-details-modal-title/trial-details-modal-title';
import UpdateTrialModalContent from '../update-trial-modal-content/update-trial-modal-content';

interface Props {
  trial: Trial;
  isOpen: boolean;
  onClose: () => void;
  updateTrialStatus: (trialStatus: TrialStatus) => void;
  updateTrial: (updateTrialAttributes: UpdateTrialAttributes) => void;
  deleteTrial: (deleteTrialAttributes: DeleteTrialAttributes) => void;
}

export default function ViewTrialModal(
  {
    trial, isOpen, onClose, updateTrialStatus, updateTrial, deleteTrial,
  }: Props,
) {
  const [isContentUpdate, setIsContentUpdate] = useState<boolean>(false);

  return (
    <Modal
      title={<TrialDetailsModalTitle trial={trial} onUpdateTrial={() => setIsContentUpdate(!isContentUpdate)} />}
      isOpen={isOpen}
      onClose={onClose}
    >
      <>
        {isContentUpdate && (
          <UpdateTrialModalContent
            trial={trial}
            updateTrial={updateTrial}
            deleteTrial={deleteTrial}
            onClose={onClose}
          />
        )}

        {!isContentUpdate && (
          <TrialDetailsModalContent
            trial={trial}
            updateTrialStatus={updateTrialStatus}
          />
        )}
      </>
    </Modal>
  );
}
