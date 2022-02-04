import React from 'react';
import CoinTable from '../components/CoinTable';
import { colorCheck } from '../assets/utils';

import { Typography, Container } from '@mui/material';

const Home = ({ light, globalStats }) => {
  return (
    <>
      <Container sx={{ mt: 10 }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '24px' }}>
          Cryptocurrency Prices by Marketcap
        </Typography>
        <Typography sx={{ mb: 3, fontSize: '14px' }}>
          Today, the global cryptocurrency marketcap is ..., a change of{' '}
          <span
            style={{
              color: colorCheck(
                globalStats.market_cap_change_percentage_24h_usd
              ),
            }}
          >
            {globalStats.market_cap_change_percentage_24h_usd.toFixed(1)}%
          </span>{' '}
          in the last 24 hours.
        </Typography>
        <CoinTable light={light} globalStats={globalStats} />
      </Container>
    </>
  );
};

export default Home;
