import mongoose from 'mongoose'
import app from './app'
import confiq from './confiq/index'
async function main() {
  try {
    await mongoose.connect(confiq.database_url as string)
    console.log('Database is connected to successfully')
    app.listen(confiq.port, () => {
      console.log(`Application listening on port ${confiq.port}`)
    })
  } catch (err) {
    console.log('Failed to connect database', err)
  }
}
main()
