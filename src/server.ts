import mongoose from 'mongoose'
import app from './app'
import { errorLogger, infoLogger } from './shared/logger'
import config from './config'
import { Server } from 'http'

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

let server: Server
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    infoLogger.info('Database is connected to successfully')
    server = app.listen(config.port, () => {
      infoLogger.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('Failed to connect database', err)
  }

  process.on('unhandledRejection', error => {
    //console.log(
    'unhandled Rejection is detected, we are closing our server connection...'
    //)
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
main()

process.on('SIGTERM', () => {
  infoLogger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
//console.log(x)
