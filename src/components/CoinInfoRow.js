import React from 'react';
import { CoinsState } from '../CoinContext';

import { Typography, Box } from '@mui/material';

const CoinInfoRow = ({ title, data, isCurrency, light }) => {
  const { currency, symbol } = CoinsState();
  return (
    <>
      <Typography
        mb={2}
        sx={{
          borderBottom: `1px solid ${light ? '#001E3C26' : '#FFFFFF26'}`,
          fontSize: '0.9rem',
        }}
      >
        {title}{' '}
        <Box
          component='span'
          sx={{ float: 'right', fontWeight: '700', fontSize: '1rem' }}
        >
          {isCurrency && currency !== 'SEK' && symbol}
          {data}
          {isCurrency && currency === 'SEK' && symbol}
        </Box>
      </Typography>
    </>
  );
};

export default CoinInfoRow;
