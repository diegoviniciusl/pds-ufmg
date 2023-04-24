import React from 'react';
import { ThemeProvider } from '@mui/material';
import './App.css';
import { ToastContainer } from 'react-toastify';
import AplicationContextProvider from './context';
import Router from './router';
import theme from './theme/material.theme';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <AplicationContextProvider>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <Router />
        </ThemeProvider>
      </AplicationContextProvider>
    </div>
  );
}

export default App;
