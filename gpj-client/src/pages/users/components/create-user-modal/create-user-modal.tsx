import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PhoneTextField, Modal, PasswordViewerAdornment } from '../../../../shared/components';
import { Role } from '../../../../shared/enums';
import { emailValidationRegex } from '../../../../shared/utils/regex';
import { CreateUserAttributes } from '../../../../interfaces';
import isValidPhone from '../../../../shared/utils/is-valid-phone';
import { MIN_PASSWORD_LENGTH, PHONE_LENGTH } from '../../../../shared/utils/constants';

interface Props {
  createUser: (createUserAttributes: CreateUserAttributes) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateUserModal(
  { createUser, isOpen, onClose }: Props,
) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const {
    handleSubmit, register, reset, control, formState: { errors, isValid },
  } = useForm<CreateUserAttributes>({ mode: 'onTouched' });

  const handleCreateUserSubmit = (createUserAttributes: CreateUserAttributes) => {
    setIsButtonLoading(true);

    createUser(createUserAttributes);
    reset();

    setIsButtonLoading(false);
  };

  return (
    <Modal title="Novo Usuário" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(handleCreateUserSubmit)} className="flex flex-col">
        <TextField
          label="Nome"
          variant="standard"
          error={!!errors.name}
          required
          fullWidth
          classes={{ root: 'mb-10' }}
          {...register('name', { required: true, maxLength: 80 })}
        />

        <FormControl variant="standard" classes={{ root: 'w-full mb-10' }} fullWidth>
          <InputLabel id="role-select-label">Nível de acesso</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            label="Nível de acesso"
            defaultValue={Role.USER}
            fullWidth
            {...register('role', { required: true })}
          >
            <MenuItem value={Role.USER}>Funcionário</MenuItem>
            <MenuItem value={Role.ADMIN}>Administrador</MenuItem>
          </Select>
          <FormHelperText>Apenas administradores tem acesso ao sistema de controle de pagamentos e custos</FormHelperText>
        </FormControl>

        <TextField
          label="Email"
          variant="standard"
          required
          fullWidth
          type="text"
          classes={{ root: 'mb-10' }}
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email', {
            required: true,
            maxLength: 80,
            pattern: { value: emailValidationRegex, message: 'Campo de email inválido' },
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

        <TextField
          label="Senha"
          type={isPasswordVisible ? 'text' : 'password'}
          variant="standard"
          required
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          classes={{ root: 'mb-10' }}
          {...register('password', {
            required: true,
            maxLength: 80,
            minLength: { value: 8, message: `A senha deve conter pelo menos ${MIN_PASSWORD_LENGTH} caracteres` },
          })}
          InputProps={{
            endAdornment: (
              <PasswordViewerAdornment
                isPasswordVisible={isPasswordVisible}
                setIsPasswordVisible={setIsPasswordVisible}
              />
            ),
          }}
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
