import mongoose from 'mongoose'
import app from './app'
import { errorLogger, infoLogger } from './shared/logger'
import config from './config'
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    infoLogger.info('Database is connected to successfully')
    app.listen(config.port, () => {
      infoLogger.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('Failed to connect database', err)
  }
}
main()
