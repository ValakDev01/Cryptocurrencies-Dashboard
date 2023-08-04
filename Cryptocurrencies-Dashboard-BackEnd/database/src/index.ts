import axios from 'axios'

import { AppDataSource } from './data-source'
import { CoinInfo } from './entity/User'

interface CoinData {
  id: number
  name: string
  symbol: string
  hidden: boolean
}

async function updateCoinDatabase (
  data: Record<string, CoinData>
): Promise<void> {
  const existingCoins = await AppDataSource.manager.find(CoinInfo)

  const coinsToRemove = existingCoins.filter(
    (coin) => !(coin.id.toString() in data)
  )

  if (coinsToRemove.length > 0) {
    console.log('Usuwanie przestarzałych monet z bazy danych...')
    await AppDataSource.manager.remove(coinsToRemove)
  }

  console.log('Aktualizacja/Wstawianie monet do bazy danych...')
  for (const key in data) {
    const coinData = data[key]
    const coin = new CoinInfo()
    coin.id = coinData.id
    coin.name = coinData.name
    coin.symbol = coinData.symbol
    coin.isHidden = coinData.hidden
    await AppDataSource.manager.save(coin)
    console.log(`Zapisano/Zaktualizowano monetę o identyfikatorze: ${coin.id}`)
  }
}

AppDataSource.initialize()
  .then(async () => {
    const data = await fetchCoinInfo()

    await updateCoinDatabase(data)

    console.log('Ładowanie monet z bazy danych...')
    const coins = await AppDataSource.manager.find(CoinInfo)
    console.log('Wczytane monety: ', coins)
  })
  .catch((error) => {
    console.log(error)
  })

async function fetchCoinInfo (): Promise<any> {
  try {
    const response = await axios.get(
      'http://localhost:3007/api/hiddenCurrencies'
    )
    const data = response.data
    return data
  } catch (error) {
    console.error(error)
  }
}
