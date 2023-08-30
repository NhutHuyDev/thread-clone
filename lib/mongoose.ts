import mongoose from 'mongoose'

let isConnected = false

export const connectDB = async () => {
    mongoose.set('strictQuery', true)

    if (!process.env.MONGODB_URL)
        return console.log("mongodb connection string not found")

    if (isConnected)
        return console.log('already connected to MongoDB');

    try {
        await mongoose.connect(process.env.MONGODB_URL)

        isConnected = true

        console.log('connected to MongoDB')
    } catch (error) {
        console.log(error)
    }
}