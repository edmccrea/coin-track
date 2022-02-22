import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { GlobalStats } from './config/api';
import './App.scss';

//Components
import Header from './components/Header';
import Home from './pages/Home';
import Coin from './pages/Coin';

//MUI
import { CssBaseline, CircularProgress, Container } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { themeDark, themeLight } from './theme';

function App() {
  const [globalStats, setGlobalStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchGlobalStats = async () => {
    const { data } = await axios.get(GlobalStats());
    setGlobalStats(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchGlobalStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [light, setLight] = useState(false);
  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      {loading ? (
        <Container
          sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress size={80} />
        </Container>
      ) : (
        <>
          <Header light={light} setLight={setLight} globalStats={globalStats} />
          <Routes>
            <Route
              path='/'
              element={<Home light={light} globalStats={globalStats} />}
            />
            <Route path='/coins/:id' element={<Coin light={light} />} />
          </Routes>
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
