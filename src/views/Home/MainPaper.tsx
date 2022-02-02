import React, { ReactElement, useEffect, useState, useCallback } from 'react'
import { styled, Box, Paper, Typography } from '@mui/material'
import axios from 'axios'
import Portfolios from '../../portfolios.json'

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
    </Paper>
  )
}

export default MainPaper

const useFetchData = () => {
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const URL_CAKE = `https://financialmodelingprep.com/api/v3/historical-price-full/CAKE?from=2017-01-01&to=2021-06-03&apikey=${process.env.REACT_APP_API_KEY}`
  const URL_PZZA = `https://financialmodelingprep.com/api/v3/historical-price-full/PZZA?from=2017-01-01&to=2021-06-03&apikey=${process.env.REACT_APP_API_KEY}`
  const URL_EAT = `https://financialmodelingprep.com/api/v3/historical-price-full/EAT?from=2017-01-01&to=2021-06-03&apikey=${process.env.REACT_APP_API_KEY}`

  // TODO: make questionnaire + save in AppContext
  const riskTolerance = 5
  const salary = 3000
  const weights = Portfolios.filter(
    (p) => p.riskToleranceLowerBound === riskTolerance || p.riskToleranceUpperBound === riskTolerance,
  )[0].portfolio
  const monthlyTotalContribution = (salary * 15) / 100

  const roundNumTwoDec = (num: number) => {
    return Math.round((num + Number.EPSILON) * 100) / 100
  }

  useEffect(() => {
    const filterData = (data: any, query: string) => {
      const weight = weights.filter((w) => w.ticker === query)[0].weight
      const monthlyContribution = monthlyTotalContribution * weight

      let sales: any = {}
      const yearsToCalculate = [2017, 2018, 2019, 2020, 2021]
      let totalShares: number = 0

      yearsToCalculate.map((year: number) => {
        const stocksPerYear = data.historical.filter((d: any) => {
          return new Date(d.date).getFullYear() === year
        })
        const stocksPerMonth: OnceMonthType[] = [...Array(12).keys()].map((_month, index) => {
          const eachMonth = stocksPerYear.filter((d: any) => {
            return new Date(d.date).getMonth() === index
          })
          const closing = eachMonth[eachMonth.length - 1]?.close
          const sharesBought = roundNumTwoDec(monthlyContribution / closing)

          totalShares += (year === 2021 && index >= 6) === false ? sharesBought : 0

          return {
            month: index + 1,
            close: closing,
            shares: sharesBought,
          }
        })
        sales[year] = stocksPerMonth
      })

      return {
        ticker: query,
        totalGain: roundNumTwoDec(totalShares * monthlyContribution),
        totalShares: roundNumTwoDec(totalShares),
      }
    }

    const fetchData = async () => {
      try {
        const requestOne = axios.get(URL_CAKE)
        const requestTwo = axios.get(URL_PZZA)
        const requestThree = axios.get(URL_EAT)

        axios
          .all([requestOne, requestTwo])
          .then(
            axios.spread((...responses) => {
              const cake = filterData(responses[0].data, 'CAKE')
              const pzza = filterData(responses[1].data, 'PZZA')
              // const eat = filterData(responses[2].data, 'EAT')
              // use/access the results

              setData({ cake, pzza })
            }),
          )
          .catch((errors) => {
            // react on errors.
          })

        // setData(requestThree)
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    }

    fetchData()
    // const fetchData = async () => {
    //   try {
    //     const { data: response } = await axios.get(
    //       //   'https://financialmodelingprep.com/api/v3/historical-price-full/EAT?year=2017&apikey=4885ce87d51f3e328078378280b55073',
    //       //   'https://financialmodelingprep.com/api/v3/historical-price-full/EAT?from=2017-01-01&to=2021-03-01&apikey=4885ce87d51f3e328078378280b55073',
    //       'https://financialmodelingprep.com/api/v3/historical-price-full/EAT?from=2017-01-01&to=2021-06-03&apikey=4885ce87d51f3e328078378280b55073',
    //       //   'https://financialmodelingprep.com/api/v3/historical-price-full/EAT?from=2017-01-01&2017-12-01&apikey=4885ce87d51f3e328078378280b55073',

    //       //   'https://financialmodelingprep.com/api/v3/historical-price-full/EAT?serietype=line&apikey=4885ce87d51f3e328078378280b55073',
    //     )
    //     setData(response)
    //   } catch (error) {
    //     console.error(error)
    //   }
    //   setLoading(false)
    // }

    // fetchData()
  }, [])

  return {
    data,
    loading,
  }
}
