/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()

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

app.get('/api', async (_req: any, res: any) => {
  try {
    let visibleCryptocurrencies: Currency[]

    if (
      cachedData !== null &&
      cacheTimestamp !== null &&
      Date.now() - cacheTimestamp < cacheDurationInSeconds * 1000
    ) {
      console.log('Serving data from cache')
      visibleCryptocurrencies = cachedData.filter(
        (currency) => !((hiddenCurrencies[currency.id]?.hidden) ?? false) ?? false
      )
    } else {
      const apiKey = '9b08de90-b259-4fac-9f94-66b420c41538'
      const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${apiKey}`

      const response = await axios.get(apiUrl)
      const data = response.data

      const cryptocurrencies = data.data

      cachedData = cryptocurrencies
      cacheTimestamp = Date.now()

      visibleCryptocurrencies = cryptocurrencies.filter(
        (currency: { id: string | number }) => !((hiddenCurrencies[currency.id]?.hidden) ?? false)
      )
    }

    res.json(visibleCryptocurrencies)
  } catch (error) {
    console.error('Error fetching data from CoinMarketCap API:', error)
    res.status(500).json({ error: 'Error fetching data from API' })
  }
})

app.post('/api/hideCurrency', (req: any, res: any) => {
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

    console.log(hiddenCurrencies)

    res.json({
      message: 'Currency hidden successfully.',
      ...hiddenCurrencies[currencyId]
    })
  } catch (error) {
    console.error('Error hiding currency:', error)
    res.status(500).json({ error: 'Error hiding currency' })
  }
})

app.post('/api/unhideCurrency', (req: any, res: any) => {
  const { currencyId } = req.body

  const { [currencyId]: deletedCurrency, ...updatedHiddenCurrencies } = hiddenCurrencies
  hiddenCurrencies = updatedHiddenCurrencies

  res.json({ message: 'Currency unhidden successfully.' })
})
