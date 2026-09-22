import * as React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import GlobalStyle from '../styles/global-styles';
import theme from '../styles/theme';

const muiTheme = createTheme({
  palette: {
    primary: { main: theme.colors.primary },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    button: { textTransform: 'none', fontWeight: 600 },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    </MuiThemeProvider>
  );
}
