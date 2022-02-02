import React, { ReactElement, useEffect, useState, useMemo } from 'react'
import { Box, Paper, Typography, Grid, Skeleton, Chip, emphasize, useMediaQuery, Alert } from '@mui/material'
import { Theme, useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { useFetchData } from '../../utils/useFetchData'
import Donut from './Donut'

const MainPaper = (): ReactElement => {
  const theme = useTheme()
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))
  const classes = useStyles()
  const { data, loading, errors } = useFetchData()
  const mockData = {
    cake: { ticker: 'CAKE', totalGain: 112744.12, totalShares: 385.45 },
    pzza: { ticker: 'PZZA', totalGain: 7038, totalShares: 78.2 },
    eat: { ticker: 'EAT', totalGain: 6346.35, totalShares: 94.02 },
  }

  const finalData = mockData

  const totalPrice = data?.cake?.totalGain + data?.pzza?.totalGain + data?.eat?.totalGain || '126128.47'
  const totalShares = data?.cake?.totalShares + data?.pzza?.totalShares + data?.eat?.totalShares || '557.67'

  const donutData = useMemo(
    () => [
      {
        label: 'cake',
        value: data?.cake?.totalShares || mockData.cake.totalShares,
        color: '#2F80ED',
        dollars: data?.cake?.totalGain || mockData.cake.totalGain,
        emoji: '🍰',
      },
      {
        label: 'pzza',
        value: data?.pzza?.totalShares || mockData.pzza.totalShares,
        color: '#F8D348',
        dollars: data?.pzza?.totalGain || mockData.pzza.totalGain,
        emoji: '🍕',
      },
      {
        label: 'eat',
        value: data?.eat?.totalShares || mockData.eat.totalShares,
        color: '#cd2fed',
        dollars: data?.eat?.totalGain || mockData.eat.totalGain,
        emoji: '😋',
      },
    ],
    [finalData],
  )

  return (
    <Paper className={classes.paper}>
      <Grid container justifyContent="space-evenly" alignItems="center">
        <Grid container justifyContent="center" alignItems="flex-start" spacing={2}>
          <Grid item>
            <Donut values={donutData} title={'$' + totalPrice} subtitle={totalShares + ' shares'} />
            <Grid container justifyContent="center" alignItems="center" spacing={3}>
              {donutData.map(({ label, dollars }) => (
                <Grid item key={label} className={classes.centered}>
                  <Typography variant="h6">{`$ ${dollars}`}</Typography>
                  <Typography variant="h6" className={classes.grey}>
                    {label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item lg={1}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              {!isMdScreen && <Typography variant="h6">Shares</Typography>}
              {donutData.map(({ value, label, emoji, color }) => (
                <Grid item key={label}>
                  <Chip
                    key={label}
                    label={`${value} ${emoji} `}
                    style={{ background: color, color: emphasize(color, 0.8) }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {errors && (
        <Box paddingY={2}>
          <Alert severity="error">{errors}</Alert>
        </Box>
      )}
    </Paper>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(4),
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    margin: theme.spacing(2),
  },
  centered: {
    textAlign: 'center',
  },
  grey: {
    color: theme.palette.grey[400],
  },
}))

export default MainPaper
