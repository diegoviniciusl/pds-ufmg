import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl, FormControlLabel, FormGroup, FormHelperText, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePickerInput, TrialNumberTextField } from '../../../../shared/components';
import { TaskType, TrialSide } from '../../../../shared/enums';
import { emailValidationRegex } from '../../../../shared/utils/regex';
import { DeleteTrialAttributes, UpdateTrialAttributes } from '../../../../interfaces';
import getTaskTypeLabel from '../../../../shared/utils/get-task-type-label';
import getTrialSideLabel from '../../../../shared/utils/get-trial-side-label';
import companiesService from '../../../companies/services/companies-service';
import Company from '../../../../models/company';
import formHelper from '../../../../shared/utils/form-helper';

import { Trial } from '../../../../models';
import DeleteTrialModal from '../delete-trial-modal/delete-trial-modal';
import isValidTrialNumber from '../../../../shared/utils/trial/is-valid-trial-number';
import { TRIAL_NUMBER_LENGTH } from '../../../../shared/utils/constants';

interface Props {
  trial: Trial;
  updateTrial: (updateTrialAttributes: UpdateTrialAttributes) => void;
  deleteTrial: (deleteTrialAttributes: DeleteTrialAttributes) => void;
  onClose: () => void;
}

export default function UpdateTrialModalContent(
  {
    trial, updateTrial, onClose, deleteTrial,
  }: Props,
) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isDeleteTrialModalOpen, setIsDeleteTrialModalOpen] = useState<boolean>(false);
  const [checkedTrialRequestedByOffice, setCheckedTrialRequestedByOffice] = useState<boolean>(trial.trialRequestedByOffice);
  const [selectedOffice, setSelectedOffice] = useState<string>(trial.office ? trial.office.name : '');

  const fetchCompaniesData = async () => {
    const fetchedCompanies = await companiesService.getCompanies().catch(() => []);
    setCompanies(fetchedCompanies);
  };

  const {
    handleSubmit, register, reset, control, setValue, formState: { errors, isValid },
  } = useForm<UpdateTrialAttributes>({ mode: 'onTouched', defaultValues: trial });

  const handleUpdateTrialSubmit = (updateTrialAttributes: UpdateTrialAttributes) => {
    setIsButtonLoading(true);
    updateTrial(formHelper.setEmptyStringsToNull<UpdateTrialAttributes>(updateTrialAttributes));
    reset();

    setIsButtonLoading(false);
    onClose();
  };

  const handleDeleteTrialClick = (deleteTrialAttributes: DeleteTrialAttributes) => {
    deleteTrial(deleteTrialAttributes);
    reset();
    onClose();
  };

  useEffect(() => {
    fetchCompaniesData();
  }, []);

  return (
    <>
      <DeleteTrialModal
        isOpen={isDeleteTrialModalOpen}
        onClose={() => setIsDeleteTrialModalOpen(false)}
        trial={trial}
        deleteTrial={handleDeleteTrialClick}
      />

      <form onSubmit={handleSubmit(handleUpdateTrialSubmit)} className="flex flex-col">
        <h2 className="font-bold mb-5 ">Dados de clientes</h2>
        <FormControl variant="standard" classes={{ root: 'w-full mb-5' }} fullWidth>
          <Autocomplete
            id="client-select"
            options={companies}
            getOptionLabel={(option: Company) => option.name}
            defaultValue={trial.client}
            renderInput={(params) => (
              <TextField
                {...params}
                id="role-client-select"
                label="Cliente"
                variant="standard"
                fullWidth
                required
              />
            )}
            onChange={(_, value) => {
              if (value) {
                setValue('clientId', value.companyId);
              }
            }}
          />
        </FormControl>

        <FormControl variant="standard" classes={{ root: 'w-full mb-5' }} fullWidth>
          <Autocomplete
            id="office-select"
            options={companies}
            getOptionLabel={(option: Company) => option.name}
            defaultValue={trial.office}
            renderInput={(params) => (
              <TextField
                {...params}
                id="role-office-select"
                label="Escritório"
                variant="standard"
                fullWidth
              />
            )}
            onChange={(_, value) => {
              if (value) {
                setValue('officeId', value.companyId);
                setSelectedOffice(value.name);
                setCheckedTrialRequestedByOffice(false);
                setValue('trialRequestedByOffice', false);
              } else {
                setValue('officeId', null);
                setSelectedOffice('');
                setCheckedTrialRequestedByOffice(false);
                setValue('trialRequestedByOffice', false);
              }
            }}
          />
          <FormHelperText>Para não adicionar um escritório, basta não selecionar nada neste campo</FormHelperText>
        </FormControl>

        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={checkedTrialRequestedByOffice} onChange={() => setCheckedTrialRequestedByOffice(!checkedTrialRequestedByOffice)} />}
            label="Este processo foi solicitado pelo escritório de advocacia"
            disabled={!selectedOffice}
            value={checkedTrialRequestedByOffice}
            style={{ color: '#4f5b62' }}
            {...register('trialRequestedByOffice', { required: false })}
          />
        </FormGroup>

        <TextField
          label="Advogado"
          variant="standard"
          fullWidth
          defaultValue={trial.lawyer}
          classes={{ root: 'mb-5' }}
          {...register('lawyer', { maxLength: 80 })}
        />

        <TextField
          label="Email de contato"
          variant="standard"
          fullWidth
          type="text"
          defaultValue={trial.email}
          classes={{ root: 'mb-15' }}
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email', {
            maxLength: 80,
            pattern: { value: emailValidationRegex, message: 'Campo de email inválido' },
          })}
        />

        <h2 className="font-bold mb-5 ">Dados de processo</h2>

        <FormControl variant="standard" classes={{ root: 'w-full mb-5' }} fullWidth>
          <Autocomplete
            id="task-type-select"
            options={Object.values(TaskType)}
            getOptionLabel={(option: TaskType) => getTaskTypeLabel(option)}
            defaultValue={trial.taskType}
            renderInput={(params) => (
              <TextField
                {...params}
                id="task-type-select"
                label="Tipo de Processo"
                variant="standard"
                required
                fullWidth
              />
            )}
            onChange={(_, value) => {
              if (value) {
                setValue('taskType', value);
              }
            }}
          />
        </FormControl>

        <Controller
          control={control}
          name="trialNumber"
          rules={{ validate: (trialNumber) => (!trialNumber || isValidTrialNumber(trialNumber)) || `O numero deve possuir ${TRIAL_NUMBER_LENGTH} dígitos` }}
          render={({
            field: {
              onChange, onBlur, value, ref,
            },
          }) => (
            <TrialNumberTextField
              label="Identificador do Processo"
              fullWidth
              variant="standard"
              classes={{ root: 'mb-5' }}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              error={!!errors.trialNumber}
              helperText={errors.trialNumber?.message}
              ref={ref}
            />
          )}
        />

        <div className="flex flex-row w-full justify-between mb-5">
          <div className="w-[46%]">
            <Controller
              control={control}
              name="deadline"
              render={({
                field: {
                  onChange,
                  value,
                },
              }) => (
                <DatePickerInput onChange={onChange} value={value} label="Prazo" />
              )}
            />
          </div>
          <div className="w-[48%] ">
            <FormControl variant="standard" fullWidth>
              <InputLabel id="role-select-trial-side">Parte</InputLabel>
              <Select
                labelId="role-select-trial-side"
                id="role-select"
                defaultValue={trial.side}
                {...register('side')}
              >
                <MenuItem key="null" value=""><em>Nenhum</em></MenuItem>
                {Object.values(TrialSide).map((value) => <MenuItem key={value} value={value}>{getTrialSideLabel(value)}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
        </div>

        <TextField
          label="Autor"
          variant="standard"
          fullWidth
          defaultValue={trial.plaintiff}
          classes={{ root: 'mb-5' }}
          {...register('plaintiff', { maxLength: 80 })}
        />

        <TextField
          label="Réu"
          variant="standard"
          fullWidth
          defaultValue={trial.defendant}
          classes={{ root: 'mb-15' }}
          {...register('defendant', { maxLength: 80 })}
        />

        <h2 className="font-bold mb-5 ">Observações</h2>
        <TextField
          label="Anotações Privadas"
          variant="standard"
          fullWidth
          multiline
          rows={4}
          defaultValue={trial.privateAnnotations}
          classes={{ root: 'mb-5' }}
          {...register('privateAnnotations', { maxLength: 80 })}
        />

        <FormControl variant="standard" classes={{ root: 'w-full mb-10' }} fullWidth>
          <TextField
            label="Anotações Públicas"
            variant="standard"
            fullWidth
            multiline
            rows={4}
            defaultValue={trial.publicAnnotations}
            classes={{ root: 'mb-5' }}
            {...register('publicAnnotations', { maxLength: 80 })}
          />
          <FormHelperText>O texto acima ficará disponível em relatórios e recibos enviados para o cliente</FormHelperText>
        </FormControl>

        <div>
          <LoadingButton
            variant="contained"
            type="submit"
            disabled={!isValid}
            loading={isButtonLoading}
          >
            Editar
          </LoadingButton>

          <Button onClick={() => setIsDeleteTrialModalOpen(true)} className="ml-5" color="error">
            <DeleteIcon className="mr-1" />
            Deletar
          </Button>
        </div>
      </form>
    </>
  );
}
