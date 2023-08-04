import axios from 'axios'

import { AppDataSource } from './data-source'
import { CoinInfo } from './entity/User'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logger = require('../../logger')
interface CoinData {
  id: number
  name: string
  symbol: string
  hidden: boolean
}

const hiddenCurrenciesUrl = process.env.HIDDEN_CURRENCIES_URL as string

async function updateCoinDatabase (
  data: Record<string, CoinData>
): Promise<void> {
  const existingCoins = await AppDataSource.manager.find(CoinInfo)

  const coinsToRemove = existingCoins.filter(
    (coin) => !(coin.id.toString() in data)
  )

  if (coinsToRemove.length > 0) {
    logger.info('Removing obsolete coins from the database...')
    await AppDataSource.manager.remove(coinsToRemove)
  }

  logger.info('Inserting coins into the database...')
  for (const key in data) {
    const coinData = data[key]
    const coin = new CoinInfo()
    coin.id = coinData.id
    coin.name = coinData.name
    coin.symbol = coinData.symbol
    coin.isHidden = coinData.hidden
    await AppDataSource.manager.save(coin)
    logger.info(`Coin ID updated: ${coin.id}`)
  }
}

AppDataSource.initialize()
  .then(async () => {
    const data = await fetchCoinInfo()

    await updateCoinDatabase(data)

    logger.info('Loading coins from the database...')
    const coins = await AppDataSource.manager.find(CoinInfo)
    logger.info('Loaded Coins: ', coins)
  })
  .catch((error) => {
    logger.error(error)
  })

async function fetchCoinInfo (): Promise<any> {
  try {
    const response = await axios.get(
      hiddenCurrenciesUrl
    )
    const data = response.data
    return data
  } catch (error) {
    logger.error(error)
  }
}
