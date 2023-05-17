import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Autocomplete,
  Checkbox,
  FormControl, FormControlLabel, TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DatePickerInput, Modal } from '../../../../shared/components';
import { TaskType, TrialStatus } from '../../../../shared/enums';
import getTaskTypeLabel from '../../../../shared/utils/get-task-type-label';
import companiesService from '../../../companies/services/companies-service';
import Company from '../../../../models/company';
import TrialsFilterAttributes from '../../../../interfaces/trials/trials-filter-attributes';
import getTrialStatusAttributes from '../../../../shared/utils/trial/get-trial-status-attributes';
import formHelper from '../../../../shared/utils/form-helper';

interface Props {
  onTrialsFilterModalChange: (trialsFilterAttributes: TrialsFilterAttributes) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function TrialsFilterModal(
  {
    onTrialsFilterModalChange, isOpen, onClose,
  }: Props,
) {
  const [isCompaniesFetching, setIsCompaniesFetching] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [taskTypeFilter, setTaskTypeFilter] = useState<TaskType | null>(null);
  const [statusFilter, setStatusFilter] = useState<TrialStatus | null>(null);
  const [clientFilter, setClientFilter] = useState<Company | null>(null);
  const [officeFilter, setOfficeFilter] = useState<Company | null>(null);

  const fetchCompaniesData = async () => {
    setIsCompaniesFetching(true);
    const fetchedCompanies = await companiesService.getCompanies().catch(() => []);
    setCompanies(fetchedCompanies);
    setIsCompaniesFetching(false);
  };

  const {
    handleSubmit, control, setValue,
  } = useForm<TrialsFilterAttributes>({ mode: 'onTouched' });

  const handleOnClose = () => {
    onClose();
  };

  const handleTrialsFilterChange = (trialsFilterAttributes: TrialsFilterAttributes) => {
    onTrialsFilterModalChange(formHelper.setEmptyStringsToUndefined<TrialsFilterAttributes>(trialsFilterAttributes));
    handleOnClose();
  };

  useEffect(() => {
    fetchCompaniesData();
  }, []);

  return (
    <Modal title="Filtragem de Processos" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(handleTrialsFilterChange)} className="flex flex-col">
        <div className="w-full flex flex-row justify-between mb-5">
          <div className="w-[48%]">
            <FormControl variant="standard" fullWidth>
              <Autocomplete
                id="task-type-select"
                options={Object.values(TaskType)}
                getOptionLabel={(option: TaskType) => getTaskTypeLabel(option)}
                value={taskTypeFilter}
                onChange={(_, newValue) => {
                  setValue('taskType', formHelper.getEmptyStringFromUndefined(newValue));
                  setTaskTypeFilter(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="task-type-select"
                    label="Tipo de Processo"
                    variant="standard"
                    fullWidth
                  />
                )}
              />
            </FormControl>
          </div>

          <div className="w-[48%]">
            <FormControl variant="standard" fullWidth>
              <Autocomplete
                id="status-select"
                options={Object.values(TrialStatus)}
                getOptionLabel={(option: TrialStatus) => getTrialStatusAttributes(option).text}
                value={statusFilter}
                onChange={(_, newValue) => {
                  setValue('status', formHelper.getEmptyStringFromUndefined(newValue));
                  setStatusFilter(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="status-select"
                    label="Status"
                    variant="standard"
                    fullWidth
                  />
                )}
              />
            </FormControl>
          </div>
        </div>

        <div className="w-full flex flex-row justify-between mb-5">
          <div className="w-[48%]">
            <FormControl variant="standard" fullWidth>
              <Autocomplete
                id="client-select"
                options={companies}
                disabled={isCompaniesFetching}
                getOptionLabel={(option: Company) => option.name}
                value={clientFilter}
                onChange={(_, newValue) => {
                  setValue('clientId', formHelper.getEmptyStringFromUndefined(newValue?.companyId));
                  setClientFilter(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="client-select"
                    label="Cliente"
                    variant="standard"
                    fullWidth
                  />
                )}
              />
            </FormControl>
          </div>

          <div className="w-[48%]">
            <FormControl variant="standard" fullWidth>
              <Autocomplete
                id="office-select"
                options={companies}
                disabled={isCompaniesFetching}
                getOptionLabel={(option: Company) => option.name}
                value={officeFilter}
                onChange={(_, newValue) => {
                  setValue('officeId', formHelper.getEmptyStringFromUndefined(newValue?.companyId));
                  setOfficeFilter(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="office-select"
                    label="Escritório"
                    variant="standard"
                    fullWidth
                  />
                )}
              />
            </FormControl>
          </div>
        </div>

        <div className="w-full flex flex-row justify-between mb-5">
          <div className="w-[48%]">
            <Controller
              control={control}
              name="fromCreatedAt"
              render={({
                field: {
                  onChange,
                  value,
                },
              }) => (
                <DatePickerInput onChange={onChange} value={value} label="De data de criação" />
              )}
            />
          </div>

          <div className="w-[48%]">
            <Controller
              control={control}
              name="toCreatedAt"
              render={({
                field: {
                  onChange,
                  value,
                },
              }) => (
                <DatePickerInput onChange={onChange} value={value} label="Até data de criação" />
              )}
            />
          </div>
        </div>

        <div className="w-full flex flex-row justify-between mb-5">
          <div className="w-[48%]">
            <Controller
              control={control}
              name="fromDeadline"
              render={({
                field: {
                  onChange,
                  value,
                },
              }) => (
                <DatePickerInput onChange={onChange} value={value} label="De prazo" />
              )}
            />
          </div>

          <div className="w-[48%]">
            <Controller
              control={control}
              name="toDeadline"
              render={({
                field: {
                  onChange,
                  value,
                },
              }) => (
                <DatePickerInput onChange={onChange} value={value} label="Até prazo" />
              )}
            />
          </div>
        </div>

        <FormControlLabel
          classes={{ root: 'mb-6' }}
          control={(
            <Controller
              control={control}
              name="pastDue"
              render={({
                field: {
                  onChange, onBlur, value, ref,
                },
              }) => (
                <Checkbox
                  onChange={onChange}
                  onBlur={onBlur}
                  checked={value}
                  ref={ref}
                />
              )}
            />
          )}
          label="Somente atrasados"
        />

        <div>
          <LoadingButton
            variant="contained"
            type="submit"
          >
            Aplicar filtro
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
}
