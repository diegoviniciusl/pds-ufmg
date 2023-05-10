import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { PasswordViewerAdornment } from '../../../../shared/components';
import { emailValidationRegex } from '../../../../shared/utils/regex';
import { LoginAttributes } from '../../../../interfaces';

interface Props {
  onLoginSubmit: (authenticationData: LoginAttributes) => void;
}

export default function LoginForm({ onLoginSubmit } : Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const {
    handleSubmit, register, formState: { errors, isValid },
  } = useForm<LoginAttributes>({ mode: 'onTouched' });

  const handleLoginSubmit = (authenticationData: LoginAttributes) => {
    setIsButtonLoading(true);
    onLoginSubmit(authenticationData);
    setIsButtonLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(handleLoginSubmit)}>
      <div className="flex flex-col">
        <TextField
          label="Email"
          variant="standard"
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

        <TextField
          label="Senha"
          type={isPasswordVisible ? 'text' : 'password'}
          variant="standard"
          fullWidth
          classes={{ root: 'mb-10' }}
          {...register('password', { required: true, maxLength: 80 })}
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
            fullWidth
            disabled={!isValid}
            loading={isButtonLoading}
          >
            Entrar
          </LoadingButton>
        </div>
      </div>
    </form>
  );
}
