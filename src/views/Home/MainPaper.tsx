import React, { ReactElement, useEffect, useState, useCallback } from 'react'
import { styled, Box, Paper, Typography } from '@mui/material'
import axios from 'axios'
import Portfolios from '../../portfolios.json'
import { useFetchData } from '../../utils/useFetchData'

type OnceMonthType = {
  month: number
  close: number
  shares: number
}

type ResultType = {
  ticker: string
  totalShares: number
  totalGain: number
}

const MainPaper = (): ReactElement => {
  const { data, loading } = useFetchData()

  console.log({ data })
  const cake = data?.cake
  const pzza = data?.pzza
  return (
    <Paper>
      <Box minHeight="300px">
        <Typography>{`total ${cake?.ticker} shares: ${cake?.totalShares}`}</Typography>
        <Typography>{`total ${cake?.ticker} gain: $ ${cake?.totalGain}`}</Typography>
      </Box>
      <Box minHeight="300px">
        <Typography>{`total ${pzza?.ticker} shares: ${pzza?.totalShares}`}</Typography>
        <Typography>{`total ${pzza?.ticker} gain: $ ${pzza?.totalGain}`}</Typography>
      </Box>
    </Paper>
  )
}

export default MainPaper
