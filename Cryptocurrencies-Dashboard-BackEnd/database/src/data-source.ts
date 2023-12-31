import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { CoinInfo } from './entity/User'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [CoinInfo],
  migrations: [],
  subscribers: []
})
