import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CoinsState } from '../CoinContext';
import { SingleCoin } from '../config/api';

//MUI
import { Container, Grid } from '@mui/material';

const Coin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState('second');

  const { currency, symbol } = CoinsState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
    console.log(coin);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Grid container>
        <Grid item>
          <img src={coin.image.large} alt='' />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Coin;
