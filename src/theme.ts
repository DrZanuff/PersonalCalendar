import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8a2be2',
      dark: '#5a189a',
      light: '#b983ff',
    },
    background: {
      default: '#242424',
      paper: '#2e2e2e',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#b3b3b3',
    },
    divider: '#3a3a3a',
    error: {
      main: '#ff4c4c',
    },
    warning: {
      main: '#ffb400',
    },
    success: {
      main: '#4caf50',
    },
    info: {
      main: '#00bcd4',
    },
    action: {
      hover: 'rgba(138, 43, 226, 0.2)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
})

export default theme
