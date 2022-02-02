import React, { ReactElement, useEffect, useState, useMemo } from 'react'
import { styled, Box, Paper, Typography, Grid, Skeleton, Chip, emphasize } from '@mui/material'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import axios from 'axios'
import Portfolios from '../../portfolios.json'
import { useFetchData } from '../../utils/useFetchData'
import Donut from './Donut'

const MainPaper = (): ReactElement => {
  const classes = useStyles()
  // const { data, loading } = useFetchData()
  const data = {
    cake: { ticker: 'CAKE', totalGain: 112744.12, totalShares: 385.45 },
    pzza: { ticker: 'PZZA', totalGain: 7038, totalShares: 78.2 },
    eat: { ticker: 'EAT', totalGain: 6346.35, totalShares: 94.02 },
  }

  console.log({ data })
  const cake = data?.cake
  const pzza = data?.pzza

  const donutData = useMemo(
    () => [
      {
        label: 'cake',
        value: data?.cake?.totalShares || 0,
        color: '#2F80ED',
      },
      {
        label: 'pzza',
        value: data?.pzza?.totalShares || 20,
        color: '#F8D348',
      },
      {
        label: 'eat',
        value: data?.eat?.totalShares || 10,
        color: '#cd2fed',
      },
    ],
    [data],
  )

  return (
    <Paper>
      <Grid container justifyContent="space-evenly" alignItems="center">
        <Donut values={donutData} title={'$12345'} subtitle={'total shares'} />
        <Grid item className={classes.centered}>
          <Typography variant="h6">{`$ ${cake?.totalGain}`}</Typography>
          <Typography variant="h6" className={classes.grey}>
            {cake?.ticker}
          </Typography>
        </Grid>
      </Grid>
      <Box paddingBottom={2}>
        <Grid container justifyContent="center">
          {donutData.map(({ value, label, color }) => (
            <Grid item key={label}>
              <Chip label={value + ' ' + label} style={{ background: color, color: emphasize(color, 0.8) }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  centered: {
    textAlign: 'center',
  },
  grey: {
    color: theme.palette.grey[400],
  },
}))

export default MainPaper
