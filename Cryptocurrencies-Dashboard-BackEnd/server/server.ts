/* eslint-disable @typescript-eslint/no-var-requires */
import 'dotenv/config'
const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
const logger = require('../logger')

app.use(cors())
app.use(express.json())

interface Currency {
  id: string
  name: string
  symbol: string
  hidden?: boolean
}

let cachedData: Currency[] | null = null
let cacheTimestamp: number | null = null
const cacheDurationInSeconds: number = 60

let hiddenCurrencies: Record<string, Currency> = {}

const apiEndpoint = process.env.API_ENDPOINT as string
const hideCurrencyEndpoint = process.env.HIDE_CURRENCY_ENDPOINT as string
const unhideCurrencyEndpoint = process.env.UNHIDE_CURRENCY_ENDPOINT as string
const hiddenCurrenciesEndpoint = process.env.HIDDEN_CURRENCIES_ENDPOINT as string
const port = process.env.PORT as string

app.get(apiEndpoint, async (_req: any, res: any) => {
  try {
    let visibleCryptocurrencies: Currency[]

    if (
      cachedData !== null &&
      cacheTimestamp !== null &&
      Date.now() - cacheTimestamp < cacheDurationInSeconds * 1000
    ) {
      logger.info('Serving data from cache')
      visibleCryptocurrencies = cachedData.filter(
        (currency) =>
          !(hiddenCurrencies[currency.id]?.hidden ?? false) ?? false
      )
    } else {
      const apiKey = process.env.API_KEY as string
      const apiUrl = `${process.env.API_URL as string}${apiKey}`

      const response = await axios.get(apiUrl)
      const data = response.data

      const cryptocurrencies = data.data

      cachedData = cryptocurrencies
      cacheTimestamp = Date.now()

      visibleCryptocurrencies = cryptocurrencies.filter(
        (currency: { id: string | number }) =>
          !(hiddenCurrencies[currency.id]?.hidden ?? false)
      )
    }

    res.json(visibleCryptocurrencies)
  } catch (error) {
    logger.error('Error fetching data from CoinMarketCap API:', error)
    res.status(500).json({ error: 'Error fetching data from API' })
  }
})

app.post(hideCurrencyEndpoint, (req: any, res: any) => {
  const { currencyId } = req.body

  try {
    const currency = cachedData?.find((currency) => currency.id === currencyId)
    if (currency === undefined) {
      return res.status(404).json({ error: 'Currency not found' })
    }

    hiddenCurrencies[currencyId] = {
      id: currencyId,
      name: currency.name,
      symbol: currency.symbol,
      hidden: true
    }

    logger.info(hiddenCurrencies)

    res.json({
      message: 'Currency hidden successfully.',
      ...hiddenCurrencies[currencyId]
    })
  } catch (error) {
    logger.error('Error hiding currency:', error)
    res.status(500).json({ error: 'Error hiding currency' })
  }
})

app.post(unhideCurrencyEndpoint, (req: any, res: any) => {
  const { currencyId } = req.body

  const { [currencyId]: deletedCurrency, ...updatedHiddenCurrencies } =
    hiddenCurrencies
  hiddenCurrencies = updatedHiddenCurrencies

  res.json({ message: 'Currency unhidden successfully.' })
})

app.get(hiddenCurrenciesEndpoint, (_req: any, res: any) => {
  try {
    res.json(hiddenCurrencies)
  } catch (error) {
    logger.error('Error fetching hidden currencies:', error)
    res.status(500).json({ error: 'Error fetching hidden currencies' })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

export { app }
