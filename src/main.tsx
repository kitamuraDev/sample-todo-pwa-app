/* eslint-disable import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom/client';

import { indigo, pink } from '@mui/material/colors';
import GlobalStyles from '@mui/material/GlobalStyles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { registerSW } from 'virtual:pwa-register';

import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: '#757de8',
      dark: '#002984',
    },
    // ついでにセカンダリーカラーも v4 に戻す
    secondary: {
      main: pink[500],
      light: '#ff6090',
      dark: '#b0003a',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);

registerSW();
