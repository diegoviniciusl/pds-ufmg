import {
  FormControl, MenuItem, Select, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Trial } from '../../../../models';
import { DatailsViewTitle, DetailsViewField } from '../../../../shared/components';
import { TrialStatus } from '../../../../shared/enums';
import dateHelper from '../../../../shared/utils/date-helper';
import formatTrialNumber from '../../../../shared/utils/trial/format-trial-number';
import TrialHistoryDisplay from '../trial-history-display/trial-history-display';
import TrialsStatusLabel from '../trials-status-label/trials-status-label';

interface Props {
  trial: Trial;
  updateTrialStatus: (trialStatus: TrialStatus) => void;
}

export default function TrialDetailsModalContent(
  {
    trial, updateTrialStatus,
  }: Props,
) {
  const [isSelectTrialDisabled, setIsSelectTrialDisabled] = useState(false);

  const handleUpdateTrialStatus = (trialStatus: TrialStatus) => {
    setIsSelectTrialDisabled(true);

    updateTrialStatus(trialStatus);

    setIsSelectTrialDisabled(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row mb-10">
        <FormControl variant="standard" classes={{ root: 'w-48 mr-5' }} fullWidth>
          <Select
            labelId="role-select-client"
            id="status-select"
            disableUnderline
            defaultValue={trial.status}
            onChange={(event) => handleUpdateTrialStatus(event.target.value as TrialStatus)}
            disabled={isSelectTrialDisabled}
          >
            {Object.values(TrialStatus).map((value) => (
              <MenuItem
                key={value}
                value={value}
              >
                <TrialsStatusLabel status={value} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <DatailsViewTitle text="Dados de Envio" />
      <DetailsViewField
        description="Solicitante"
        text={trial.trialRequestedByOffice ? trial.office?.name : trial.client.name}
      />
      <div className="flex flex-row mb-10">
        <div className="mr-10">
          <DetailsViewField
            description="Prazo"
            text={dateHelper.getLocaleDate(trial.deadline)}
          />
        </div>
        <DetailsViewField
          description="Email"
          text={trial.trialRequestedByOffice ? trial.office?.email : trial.client.email}
        />
      </div>

      <DatailsViewTitle text="Processo" />
      <DetailsViewField
        description="Número"
        text={trial.trialNumber ? formatTrialNumber(trial.trialNumber.toString()) : null}
      />
      <div className="flex flex-row">
        <div className="mr-10">
          <DetailsViewField
            description="Serviço"
            text={dateHelper.getLocaleDate(trial.deadline)}
          />
        </div>
        <div className="mr-10">
          <DetailsViewField
            description="Estado"
            text={trial.region}
          />
        </div>
        <DetailsViewField
          description="Tipo do Processo"
          text={trial.trialType}
        />
      </div>
      <DetailsViewField
        description="Autor"
        text={trial.plaintiff}
      />
      <DetailsViewField
        description="Réu"
        text={trial.defendant}
      />

      <div className="mt-10">
        <DatailsViewTitle text="Empresas" />
        <Typography className="mb-3" variant="h4">Cliente</Typography>
        <DetailsViewField
          description="Nome"
          text={trial.client.name}
        />
        <div className="flex flex-row">
          <div className="mr-10">
            <DetailsViewField
              description="Email"
              text={trial.client.email}
            />
          </div>
          <div className="mr-10">
            <DetailsViewField
              description="CNPJ"
              text={trial.client.taxNumber}
            />
          </div>
          <DetailsViewField
            description="Telefone"
            text={trial.client.phone}
          />
        </div>
      </div>

      {trial.office
        && (
          <div className="mt-10">
            <Typography className="mb-3" variant="h4">Escritório</Typography>
            <DetailsViewField
              description="Nome"
              text={trial.office.name}
            />
            <div className="flex flex-row">
              <div className="mr-10">
                <DetailsViewField
                  description="Email"
                  text={trial.office.email}
                />
              </div>
              <div className="mr-10">
                <DetailsViewField
                  description="CNPJ"
                  text={trial.office.taxNumber}
                />
              </div>
              <DetailsViewField
                description="Telefone"
                text={trial.office.phone}
              />
            </div>
          </div>
        )}

      <div className="mt-10">
        <DatailsViewTitle text="Observações" />
        <DetailsViewField
          description="Anotações Públicas"
          text={trial.publicAnnotations}
        />
        <div className="mt-5">
          <DetailsViewField
            description="Anotações Privadas"
            text={trial.privateAnnotations}
          />
        </div>
      </div>

      {!trial.office && <Typography className="mt-10" variant="h4">Escritório não informado</Typography>}

      <div className="mt-10">
        <DatailsViewTitle text="Histórico" />
        <TrialHistoryDisplay histories={trial.trialHistories} />
      </div>

    </div>
  );
}
