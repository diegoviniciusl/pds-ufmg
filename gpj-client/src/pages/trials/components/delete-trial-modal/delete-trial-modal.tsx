import { Button, Typography } from '@mui/material';
import React from 'react';
import { DeleteTrialAttributes } from '../../../../interfaces';
import { Trial } from '../../../../models';
import { Modal } from '../../../../shared/components';

interface Props {
  trial: Trial;
  isOpen: boolean;
  onClose: () => void;
  deleteTrial: (deleteTrialAttributes: DeleteTrialAttributes) => void;
}

export default function DeleteTrialModal(
  {
    trial, isOpen, onClose, deleteTrial,
  }: Props,
) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      width={400}
    >
      <>
        <div className="flex flex-col justify-center mb-10">
          <Typography variant="body1" align="center">Você deseja continuar com a deleção?</Typography>
          <Typography variant="body1" align="center">
            Essa ação é
            {' '}
            <b>irreversível</b>
            .
          </Typography>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-6/12 flex flex-row justify-between">
            <Button
              color="secondary"
              variant="contained"
              onClick={() => onClose()}
            >
              Não
            </Button>

            <Button color="error" onClick={() => deleteTrial(trial)}>
              Sim
            </Button>
          </div>
        </div>
      </>
    </Modal>
  );
}
