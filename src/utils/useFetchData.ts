import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Portfolios from '../portfolios.json'

type OnceMonthType = {
  month: number
  close: number
  shares: number
}

export const useFetchData = () => {
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState()
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
        return (sales[year] = stocksPerMonth)
      })

      return {
        ticker: query,
        totalGain: roundNumTwoDec(totalShares * monthlyContribution),
        totalShares: roundNumTwoDec(totalShares),
        data: sales,
      }
    }

    const fetchData = async () => {
      try {
        const requestOne = axios.get(URL_CAKE)
        const requestTwo = axios.get(URL_PZZA)
        const requestThree = axios.get(URL_EAT)

        axios
          .all([requestOne, requestTwo, requestThree])
          .then(
            axios.spread((...responses) => {
              const cake = filterData(responses[0].data, 'CAKE')
              const pzza = filterData(responses[1].data, 'PZZA')
              const eat = filterData(responses[2].data, 'EAT')
              setData({ cake, pzza, eat })
            }),
          )
          .catch((errors) => {
            console.error(errors)
          })
      } catch (error) {
        setErrors(errors)
      }
      setLoading(false)
    }

    fetchData()
  }, [URL_CAKE, URL_EAT, URL_PZZA, errors, monthlyTotalContribution, weights])

  return {
    data,
    loading,
    errors,
  }
}
