/* eslint-disable no-console */
import mongoose from 'mongoose'
import app from './app'
import confiq from './confiq/index'
import { errorLogger, infoLogger } from './shared/logger'
async function main() {
  try {
    await mongoose.connect(confiq.database_url as string)
    infoLogger.info('Database is connected to successfully')
    app.listen(confiq.port, () => {
      infoLogger.info(`Application listening on port ${confiq.port}`)
    })
  } catch (err) {
    errorLogger.error('Failed to connect database', err)
  }
}
main()
