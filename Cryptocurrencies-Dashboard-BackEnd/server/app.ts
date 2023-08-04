import express from 'express'
import cors from 'cors'

import { router } from './server'
import 'dotenv/config'

const app = express()
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logger = require('../logger')
const port = process.env.PORT as string

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}!`)
})

export { app }
