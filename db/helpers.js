import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'

export function connectToDB() {
  return mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
}

export function truncateDB() {
  // return mongoose.connection.db.dropDatabase()

  //* If having issues dropping db locally, comment this ^^^ line above back om  and COMMENT OUT the if statement below !

  if (mongoose.connection.readyState !== 0) {
    const { collections } = mongoose.connection

    const promises = Object.keys(collections).map(collection => {
      return mongoose.connection.collection(collection).deleteMany({})
    })

    return Promise.all(promises)
  }
}

export function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    return mongoose.disconnect()
  }
}