import React, { useEffect } from 'react';
import {
  Card, CardContent, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './components';
import { images } from '../../shared/utils/public';
import { Path } from '../../shared/enums';
import loginService from './services/login-service';
import useUserContext from '../../context/user/context';
import { LoginAttributes } from '../../interfaces';

export default function Login() {
  const navigate = useNavigate();
  const { setUser, isUserAuthenticated, setIsUserAuthenticated } = useUserContext();

  useEffect(() => {
    if (isUserAuthenticated) navigate(Path.TRIALS);
  }, [isUserAuthenticated, navigate]);

  const handleLogin = async (loginAttributes: LoginAttributes) => {
    try {
      const user = await loginService.login(loginAttributes);

      setUser(user);
      setIsUserAuthenticated(true);
      navigate(Path.TRIALS);
    } catch { }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="h-full flex items-center">
        <Card className="w-130 pr-10 pl-10 pt-12 pb-20">
          <CardContent className="flex flex-col">
            <div className="flex justify-center mb-12">
              <img
                src={images.gpjLogo.src}
                alt={images.gpjLogo.alt}
                width="230px"
              />
            </div>

            <div className="mb-10">
              <Typography variant="h1">Login</Typography>
            </div>

            <LoginForm onLoginSubmit={handleLogin} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
