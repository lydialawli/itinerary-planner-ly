import React, { useEffect, useState } from 'react'
import axios, { AxiosInstance } from 'axios'
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
    const filterData = (data: any) => {
      const weight = weights.filter((w) => w.ticker === data.symbol)[0].weight
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
        ticker: data.symbol,
        totalGain: roundNumTwoDec(totalShares * monthlyContribution),
        totalShares: roundNumTwoDec(totalShares),
        data: sales,
      }
    }

    const scheduleRequests = (axiosInstance: AxiosInstance, intervalMs: number) => {
      let lastInvocationTime: number | undefined = undefined

      const scheduler = (config: unknown) => {
        const now = Date.now()
        if (lastInvocationTime) {
          lastInvocationTime += intervalMs
          const waitPeriodForThisRequest = lastInvocationTime - now
          if (waitPeriodForThisRequest > 0) {
            return new Promise((resolve) => {
              setTimeout(() => resolve(config), waitPeriodForThisRequest)
            })
          }
        }

        lastInvocationTime = now
        return config
      }

      axiosInstance.interceptors.request.use(scheduler)
    }

    const fetchData = async () => {
      setLoading(true)

      const financialService = axios.create({
        baseURL: 'https://financialmodelingprep.com/api/v3/historical-price-full',
      })
      scheduleRequests(financialService, 500)
      const URL_CAKE = `/CAKE?from=2017-01-01&to=2021-06-03&apikey=${process.env.REACT_APP_API_KEY}`
      const URL_PZZA = `/PZZA?from=2017-01-01&to=2021-06-03&apikey=${process.env.REACT_APP_API_KEY}`
      const URL_EAT = `/EAT?from=2017-01-01&to=2021-06-03&apikey=${process.env.REACT_APP_API_KEY}`

      try {
        const urls = [URL_CAKE, URL_PZZA, URL_EAT]
        const urlRequests = urls.map((url) => financialService.get(url).then((result) => result.data))
        return axios.all(urlRequests).then(
          axios.spread((...responses) => {
            const cake = filterData(responses[0])
            const pzza = filterData(responses[1])
            const eat = filterData(responses[2])
            setData({ cake, pzza, eat })
            setLoading(false)
          }),
        )
      } catch (error) {
        setErrors(errors)
      }
    }

    fetchData()
  }, [errors, monthlyTotalContribution, weights, setLoading])

  return {
    data,
    loading,
    errors,
  }
}
