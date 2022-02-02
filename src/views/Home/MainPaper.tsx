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

  const finalData = data !== undefined ? data : mockData

  const totalPrice = finalData.cake.totalGain + finalData.pzza.totalGain + finalData.eat.totalGain
  const totalShares = finalData.cake.totalShares + finalData.pzza.totalShares + finalData.eat.totalShares

  const donutData = useMemo(
    () => [
      {
        label: 'cake',
        value: finalData.cake?.totalShares || 30,
        color: '#2F80ED',
        dollars: finalData.cake?.totalGain,
        emoji: '🍰',
      },
      {
        label: 'pzza',
        value: finalData.pzza?.totalShares || 20,
        color: '#F8D348',
        dollars: finalData.pzza?.totalGain,
        emoji: '🍕',
      },
      {
        label: 'eat',
        value: finalData.eat?.totalShares || 10,
        color: '#cd2fed',
        dollars: finalData.eat?.totalGain,
        emoji: '😋',
      },
    ],
    [data],
  )

  return (
    <Paper className={classes.paper}>
      <Grid container justifyContent="space-evenly" alignItems="center">
        <Grid container justifyContent="center" alignItems="flex-start" spacing={2}>
          <Grid item>
            <Donut values={donutData} title={'$' + totalPrice} subtitle={totalShares + ' shares'} />
            <Grid container justifyContent="center" alignItems="center" spacing={3}>
              {donutData.map(({ value, label, dollars }) => (
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
  },
  centered: {
    textAlign: 'center',
  },
  grey: {
    color: theme.palette.grey[400],
  },
}))

export default MainPaper
