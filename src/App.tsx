import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import { AppProvider } from './contexts/AppContext';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import ScoreMetrics from './pages/ScoreMetrics';
import CustomerScores from './pages/CustomerScores';
import JobLogs from './pages/JobLogs';

// Create RTL cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
  prepend: true,
});

// Create RTL theme
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: [
      'IRANSans',
      'Iran Sans',
      'Vazirmatn',
      'Tahoma',
      'Arial',
      'sans-serif'
    ].join(','),
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          direction: 'rtl',
        },
        html: {
          direction: 'rtl',
        },
        '*': {
          boxSizing: 'border-box',
        }
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          direction: 'rtl',
        },
      },
    },
  },
});

function App() {
  return (
    <AppProvider>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="score-metrics" element={<ScoreMetrics />} />
                <Route path="customer-scores" element={<CustomerScores />} />
                <Route path="job-logs" element={<JobLogs />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </CacheProvider>
    </AppProvider>
  );
}

export default App;
