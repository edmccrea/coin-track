import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { CoinsState } from '../CoinContext';
import { SingleCoin } from '../config/api';
import { colorCheck, currencyFormat } from '../assets/utils';

import CoinInfoRow from '../components/CoinInfoRow';
import CurrencyConverter from '../components/CurrencyConverter';
import CoinGraph from '../components/CoinGraph';

//MUI
import {
  CircularProgress,
  Container,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';

const Coin = ({ light }) => {
  const { id } = useParams();
  const [coin, setCoin] = useState('');
  const [loading, setLoading] = useState(true);

  const { currency, symbol } = CoinsState();

  const fetchCoin = async () => {
    setLoading(true);
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
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
        <Grid container mt={6} spacing={4}>
          {/* Coin Information */}
          <Grid
            item
            sm={12}
            md={6}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <Typography
              mb={1}
              variant='caption'
              sx={{
                backgroundColor: `${light ? '#00000009' : '#FFFFFF10'}`,
                border: '1px solid none',
                borderRadius: '5px',
                padding: '5px',
                display: 'inline-block',
                width: 'fit-content',
              }}
            >
              Rank #{coin.market_cap_rank}
            </Typography>
            <Box
              component='span'
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <img
                src={coin.image.large}
                alt=''
                style={{ width: '30px', height: '30px', marginRight: '10px' }}
              />
              <Typography variant='h5'>
                {coin.name} ({coin.symbol.toUpperCase()})
              </Typography>
            </Box>

            <Box mt={1} mb={5} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='h4'>
                {currency !== 'SEK' && symbol}
                {currencyFormat(
                  coin.market_data.current_price[currency.toLowerCase()]
                )}
                {currency === 'SEK' && symbol}
              </Typography>
              <Typography
                variant='h5'
                ml={1}
                sx={{
                  color: colorCheck(
                    coin.market_data.price_change_percentage_24h,
                    light
                  ),
                }}
              >
                {coin.market_data.price_change_percentage_24h >= 0 ? (
                  <ArrowDropUp
                    fontSize='large'
                    sx={{ verticalAlign: 'middle' }}
                  />
                ) : (
                  <ArrowDropDown
                    fontSize='large'
                    sx={{ verticalAlign: 'middle' }}
                  />
                )}
                {Number(
                  coin.market_data.price_change_percentage_24h.toFixed(1)
                )}
                %
              </Typography>
            </Box>

            {/* Coin Info Rows */}
            <Grid container spacing={2} mb={2}>
              <Grid
                item
                lg={6}
                md={12}
                sm={12}
                sx={{ paddingTop: '0px !important', width: '100%' }}
              >
                <CoinInfoRow
                  light={light}
                  title={'Market Cap'}
                  data={currencyFormat(
                    coin.market_data.market_cap[currency.toLowerCase()]
                  )}
                  isCurrency={true}
                />
                <CoinInfoRow
                  light={light}
                  title={'All Time High'}
                  data={currencyFormat(
                    coin.market_data.ath[currency.toLowerCase()]
                  )}
                  isCurrency={true}
                />
                <CoinInfoRow
                  light={light}
                  title={'All Time Low'}
                  data={currencyFormat(
                    coin.market_data.atl[currency.toLowerCase()]
                  )}
                  isCurrency={true}
                />
              </Grid>
              <Grid
                item
                lg={6}
                md={12}
                sm={12}
                sx={{ paddingTop: '0px !important', width: '100%' }}
              >
                <CoinInfoRow
                  light={light}
                  title={'Total Volume'}
                  data={currencyFormat(
                    coin.market_data.total_volume[currency.toLowerCase()]
                  )}
                  isCurrency={true}
                />
                <CoinInfoRow
                  light={light}
                  title={'Total Supply'}
                  data={
                    coin.market_data.total_supply === null
                      ? 'N/A'
                      : currencyFormat(coin.market_data.total_supply.toFixed())
                  }
                />
                <CoinInfoRow
                  light={light}
                  title={'Circulating Supply'}
                  data={currencyFormat(
                    coin.market_data.circulating_supply.toFixed()
                  )}
                />
              </Grid>
            </Grid>

            {/* Currency Converter */}
            <CurrencyConverter coin={coin} light={light} />

            {/* Coin Description */}
            <Typography mt={3}>
              {parse(coin.description.en.split('. ', 2).join('. '))}.
            </Typography>
          </Grid>

          {/* Graph */}
          <Grid
            item
            sm={12}
            md={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <CoinGraph coin={coin} light={light} mt={4} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Coin;
