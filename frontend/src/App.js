import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import Layout from './components/Layout/Layout';
import Analytics from './components/Analytics/Analytics';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Analytics />
        <Layout />
      </Router>
    </ThemeProvider>
  );
}

export default App;
