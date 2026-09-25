import * as React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import GlobalStyle from '../styles/global-styles';
import theme from '../styles/theme';

const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: theme.colors.primary,
      contrastText: theme.colors.onPrimary,
    },
    secondary: {
      main: theme.colors.accent,
      contrastText: theme.colors.onPrimary,
    },
    background: {
      default: theme.colors.background,
      paper: theme.colors.surface,
    },
    text: {
      primary: theme.colors.title,
      secondary: theme.colors.text,
    },
    divider: theme.colors.border,
  },
  typography: {
    fontFamily: theme.fonts.text,
    button: {
      fontFamily: theme.fonts.title,
      textTransform: 'none',
      fontWeight: 700,
    },
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
