import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CreateCompanyAttributes } from '../../../../interfaces';
import { Modal, PhoneTextField, TaxNumberTextField } from '../../../../shared/components';
import { PHONE_LENGTH } from '../../../../shared/utils/constants';
import { emailValidationRegex } from '../../../../shared/utils/regex';
import isValidPhone from '../../../../shared/utils/is-valid-phone';
import isValidTaxNumber from '../../../../shared/utils/company/is-valid-tax-number';

interface Props {
  createCompany: (createCompanyAttributes: CreateCompanyAttributes) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateCompanyModal(
  { createCompany, isOpen, onClose }: Props,
) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const {
    handleSubmit, register, reset, control, formState: { errors, isValid },
  } = useForm<CreateCompanyAttributes>({
    mode: 'onTouched',
    defaultValues: {
      receiptDescription: 'Pessoa jurídica, inscrita no CNPJ sob nº XXXXXXX, com sede na XXXXXXX.',
    },
  });

  const handleCreateCompanySubmit = (createCompanyAttributes: CreateCompanyAttributes) => {
    setIsButtonLoading(true);

    createCompany(createCompanyAttributes);
    reset();

    setIsButtonLoading(false);
  };

  return (
    <Modal title="Nova Empresa" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(handleCreateCompanySubmit)} className="flex flex-col">
        <TextField
          label="Nome"
          variant="standard"
          required
          error={!!errors.name}
          fullWidth
          classes={{ root: 'mb-10' }}
          {...register('name', { required: true, maxLength: 80 })}
        />

        <TextField
          label="Email"
          variant="standard"
          fullWidth
          type="text"
          classes={{ root: 'mb-10' }}
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email', {
            maxLength: 80,
            setValueAs: (email) => (!email || email.lenght === 0 ? null : email),
            validate: (email) => !email || emailValidationRegex.test(email) || 'Email inválido',
          })}
        />

        <Controller
          control={control}
          name="phone"
          rules={{ validate: (phone) => (!phone || isValidPhone(phone)) || `O telefone deve possuir ${PHONE_LENGTH} dígitos` }}
          render={({
            field: {
              onChange, onBlur, value, ref,
            },
          }) => (
            <PhoneTextField
              label="Telefone"
              fullWidth
              variant="standard"
              classes={{ root: 'mb-10' }}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              ref={ref}
            />
          )}
        />

        <Controller
          control={control}
          name="taxNumber"
          rules={{ validate: (taxNumber) => (!taxNumber || isValidTaxNumber(taxNumber)) || 'O campo de CPF/CPNJ inválido' }}
          render={({
            field: {
              onChange, onBlur, value, ref,
            },
          }) => (
            <TaxNumberTextField
              label="CPF/CNPJ"
              fullWidth
              variant="standard"
              classes={{ root: 'mb-10' }}
              onChange={onChange}
              onBlur={onBlur}
              error={!!errors.taxNumber}
              helperText={errors.taxNumber?.message}
              value={value}
              ref={ref}
            />
          )}
        />

        <TextField
          label="Descrição para o contrato"
          variant="standard"
          fullWidth
          type="text"
          multiline
          classes={{ root: 'mb-10' }}
          rows={3}
          {...register('receiptDescription', {
            setValueAs: (receiptDescription) => (!receiptDescription || receiptDescription.lenght === 0 ? null : receiptDescription),
          })}
        />

        <TextField
          label="Comentários"
          variant="standard"
          fullWidth
          multiline
          rows={3}
          classes={{ root: 'mb-10' }}
          {...register('notes', { maxLength: 200 })}
        />

        <div>
          <LoadingButton
            variant="contained"
            type="submit"
            disabled={!isValid}
            loading={isButtonLoading}
          >
            Criar
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
}
