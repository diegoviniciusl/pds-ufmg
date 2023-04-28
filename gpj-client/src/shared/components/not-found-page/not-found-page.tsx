import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserContext from '../../../context/user/context';
import notFoundPageService from './services/not-found-page-service';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { isUserAuthenticated } = useUserContext();

  const defaultPath = notFoundPageService.getDefaultPath(isUserAuthenticated);

  useEffect(() => {
    navigate(defaultPath);
  }, [navigate, defaultPath]);

  return (
    <div />
  );
}
