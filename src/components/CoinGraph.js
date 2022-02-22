import React, { useState, useEffect } from 'react';
import { CoinsState } from '../CoinContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { colorCheck } from '../assets/utils';

import {
  CircularProgress,
  Box,
  Button,
  ButtonGroup,
  Typography,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import { graphSpan } from '../config/data';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const CoinGraph = ({ coin, light }) => {
  const [graphData, setGraphData] = useState([]);
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(true);

  const { currency } = CoinsState();

  const fetchGraphData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setLoading(false);
    setGraphData(data.prices);
  };

  useEffect(() => {
    fetchGraphData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const pad = (num) => {
    return num < 10 ? '0' : '';
  };

  const dateConfig = {
    month: 'short',
    day: 'numeric',
  };

  const data = {
    labels: graphData.map((coin) => {
      let date = new Date(coin[0]);
      let time = `${pad(date.getHours()) + date.getHours()}:${
        pad(date.getMinutes()) + date.getMinutes()
      }`;

      return days > 1 ? date.toLocaleDateString('en-GB', dateConfig) : time;
    }),

    datasets: [
      {
        data: graphData.map((coin) => coin[1]),
        label: `Price in ${currency}`,
        borderColor: `${light ? '#001E3C' : '#f8f9fa'}`,
        borderWidth: 1,
        radius: 0,
        tension: 0.3,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          major: true,
        },
      },
      y: {
        grid: {
          borderColor: `${light ? '#001E3C26' : '#FFFFFF26'}`,
          color: `${light ? '#001E3C26' : '#FFFFFF26'}`,
        },
      },
    },
    responsive: true,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const dayPercentages = [
    {
      time: '24h',
      value: coin.market_data.price_change_percentage_24h.toFixed(1),
    },
    {
      time: '7d',
      value: coin.market_data.price_change_percentage_7d.toFixed(1),
    },
    {
      time: '14d',
      value: coin.market_data.price_change_percentage_14d.toFixed(1),
    },
    {
      time: '30d',
      value: coin.market_data.price_change_percentage_30d.toFixed(1),
    },
    {
      time: '1y',
      value: coin.market_data.price_change_percentage_1y.toFixed(1),
    },
  ];

  const boxStyling = {
    display: 'flex',
    justifyContent: 'space-evenly',
    textAlign: 'center',
  };

  return (
    <Box sx={{ width: '100%' }}>
      {loading ? (
        <CircularProgress size={80} />
      ) : (
        <>
          <ButtonGroup
            variant='outlined'
            aria-label='outlined button group'
            size='small'
            sx={{ marginTop: '41px' }}
          >
            {graphSpan.map((day) => (
              <Button
                key={day.value}
                onClick={() => setDays(day.value)}
                sx={{
                  backgroundColor: `${
                    day.value === days && light ? '#00000009' : ''
                  } ${day.value === days && !light ? '#FFFFFF10' : ''}`,
                }}
              >
                {day.label}
              </Button>
            ))}
          </ButtonGroup>
          <Line data={data} options={options} />

          <Box
            mt={3}
            mb={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              border: `1px solid ${
                light ? 'rgba(18, 18, 18, 0.5)' : 'rgba(248, 249, 250, 0.5)'
              }`,
              borderRadius: '4px',
            }}
          >
            <Box
              sx={{
                ...boxStyling,
                backgroundColor: `${light ? '#00000009' : '#FFFFFF10'}`,
              }}
            >
              {dayPercentages.map((timeSpan) => (
                <Typography
                  key={timeSpan.time}
                  sx={{
                    width: '20%',
                    borderBottom: `1px solid ${
                      light
                        ? 'rgba(18, 18, 18, 0.5)'
                        : 'rgba(248, 249, 250, 0.5)'
                    }`,
                  }}
                >
                  {timeSpan.time}
                </Typography>
              ))}
            </Box>
            <Box
              sx={{
                ...boxStyling,
              }}
            >
              {dayPercentages.map((timeSpan) => (
                <Typography
                  key={timeSpan.value}
                  sx={{
                    fontWeight: '400',
                    width: '20%',
                    color: colorCheck(timeSpan.value, light),
                  }}
                >
                  {timeSpan.value}%
                </Typography>
              ))}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CoinGraph;
