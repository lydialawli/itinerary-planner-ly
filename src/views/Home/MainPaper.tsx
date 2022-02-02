import React, { ReactElement, useEffect, useState } from 'react'
import { styled, Box, Paper, Typography } from '@mui/material'
import axios from 'axios'
import Portfolios from '../../portfolios.json'

type OnceMonthType = {
  month: number
  close: number
  shares: number
}

type ResultType = {
  eatTotalShares: number
  eatTotalGain: number
}

const MainPaper = (): ReactElement => {
  const { data, loading } = useFetchData()
  // const [result, setResult] = useState<ResultType>({ eatTotalShares: 0, eatTotalGain: 0 })

  console.log(data)
  // // TODO: user input + get data from portfolio.json
  // const salary = 3000
  // const monthlyTotalContribution = (salary * 15) / 100
  // const monthyEATContrib = monthlyTotalContribution * 0.15 // the weight found in potfolio

  // const roundNumTwoDec = (num: number) => {
  //   return Math.round((num + Number.EPSILON) * 100) / 100
  // }

  // useEffect(() => {
  //   if (data && data.historical) {
  //     let sales: any = {}
  //     const yearsToCalculate = [2017, 2018, 2019, 2020, 2021]
  //     let totalEatShares: number = 0

  //     yearsToCalculate.map((year: number) => {
  //       const stocksPerYear = data.historical.filter((d: any) => {
  //         return new Date(d.date).getFullYear() === year
  //       })
  //       const stocksPerMonth: OnceMonthType[] = [...Array(12).keys()].map((_month, index) => {
  //         const eachMonth = stocksPerYear.filter((d: any) => {
  //           return new Date(d.date).getMonth() === index
  //         })
  //         const closing = eachMonth[eachMonth.length - 1]?.close
  //         const sharesBought = roundNumTwoDec(monthyEATContrib / closing)

  //         totalEatShares += (year === 2021 && index >= 6) === false ? sharesBought : 0

  //         return {
  //           month: index + 1,
  //           close: closing,
  //           shares: sharesBought,
  //         }
  //       })
  //       sales[year] = stocksPerMonth
  //     })

  //     setResult({
  //       eatTotalGain: roundNumTwoDec(totalEatShares * monthyEATContrib),
  //       eatTotalShares: roundNumTwoDec(totalEatShares),
  //     })
  //   }
  // }, [data, monthyEATContrib])

  return (
    <Paper>
      <Box minHeight="300px">
        <Typography>total EAT shares: {data?.eatTotalShares}</Typography>
        <Typography>total EAT gain: $ {data?.eatTotalGain}</Typography>
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

  // TODO: user input + get data from portfolio.json
  const riskTolerance = 5
  const salary = 3000
  const weights = Portfolios.filter(
    (p) => p.riskToleranceLowerBound === riskTolerance || p.riskToleranceUpperBound === riskTolerance,
  )[0].portfolio

  const monthlyTotalContribution = (salary * 15) / 100
  const monthyEATContrib = monthlyTotalContribution * 0.15 // the weight found in potfolio

  const roundNumTwoDec = (num: number) => {
    return Math.round((num + Number.EPSILON) * 100) / 100
  }

  useEffect(() => {
    const filterData = (data: any) => {
      let sales: any = {}
      const yearsToCalculate = [2017, 2018, 2019, 2020, 2021]
      let totalEatShares: number = 0

      yearsToCalculate.map((year: number) => {
        const stocksPerYear = data.historical.filter((d: any) => {
          return new Date(d.date).getFullYear() === year
        })
        const stocksPerMonth: OnceMonthType[] = [...Array(12).keys()].map((_month, index) => {
          const eachMonth = stocksPerYear.filter((d: any) => {
            return new Date(d.date).getMonth() === index
          })
          const closing = eachMonth[eachMonth.length - 1]?.close
          const sharesBought = roundNumTwoDec(monthyEATContrib / closing)

          totalEatShares += (year === 2021 && index >= 6) === false ? sharesBought : 0

          return {
            month: index + 1,
            close: closing,
            shares: sharesBought,
          }
        })
        sales[year] = stocksPerMonth
      })

      return {
        eatTotalGain: roundNumTwoDec(totalEatShares * monthyEATContrib),
        eatTotalShares: roundNumTwoDec(totalEatShares),
      }
    }

    const fetchData = async () => {
      try {
        const requestOne = axios.get(URL_CAKE)
        const requestTwo = axios.get(URL_PZZA)
        // const requestThree = axios.get(URL_EAT)

        axios
          .all([requestOne, requestTwo])
          .then(
            axios.spread((...responses) => {
              const responseOne = filterData(responses[0].data)
              const responseTwo = filterData(responses[1].data)
              // const responseThree = filterData(responses[2].data)
              // use/access the results

              console.log({ responseOne, responseTwo })
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
