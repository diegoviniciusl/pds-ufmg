import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Checkbox, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Modal, PasswordViewerAdornment, PhoneTextField } from '../../../../shared/components';
import { Role } from '../../../../shared/enums';
import { emailValidationRegex } from '../../../../shared/utils/regex';
import { UpdateUserAttributes } from '../../../../interfaces';
import { User } from '../../../../models';
import isValidPhone from '../../../../shared/utils/is-valid-phone';
import isValidPassword from '../../../../shared/utils/user/is-valid-password';
import { MIN_PASSWORD_LENGTH, PHONE_LENGTH } from '../../../../shared/utils/constants';

interface Props {
  updateUser: (updateUserAttributes : UpdateUserAttributes) => void;
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export default function UpdateUserModal(
  {
    updateUser, isOpen, onClose, user,
  }: Props,
) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const {
    handleSubmit, register, control, formState: { errors, isValid }, reset,
  } = useForm<UpdateUserAttributes>({ defaultValues: user, mode: 'onTouched' });

  const handleUpdateUserSubmit = (updateUserAttributes: UpdateUserAttributes) => {
    setIsButtonLoading(true);
    updateUser(updateUserAttributes);
    setIsButtonLoading(false);
  };

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  return (
    <Modal title="Editar Usuário" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(handleUpdateUserSubmit)} className="flex flex-col">
        <TextField
          label="Nome"
          variant="standard"
          fullWidth
          classes={{ root: 'mb-6' }}
          {...register('name', { required: true, maxLength: 80 })}
        />

        <FormControl variant="standard" classes={{ root: 'w-full mb-6' }} fullWidth onSubmit={handleSubmit(updateUser)}>
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
          fullWidth
          type="text"
          classes={{ root: 'mb-6' }}
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
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message || 'A senha do usuário não será alterada caso o campo permaneça vazio'}
          classes={{ root: 'mb-6' }}
          {...register('password', {
            maxLength: 80,
            validate: (password) => !password || isValidPassword(password) || `A senha deve conter pelo menos ${MIN_PASSWORD_LENGTH} caracteres`,
            setValueAs: (password) => (password.length === 0 ? undefined : password),
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

        <FormControlLabel
          classes={{ root: 'mb-6' }}
          control={(
            <Controller
              control={control}
              name="active"
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
          label="Ativo"
        />

        <div>
          <LoadingButton
            variant="contained"
            disabled={!isValid}
            type="submit"
            loading={isButtonLoading}
          >
            Editar
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
}
