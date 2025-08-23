import { Hono } from 'hono'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

// Setup DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err))

const app = new Hono()

// Demo endpoint. Check karo ki chal raha hai ki nahi using postman
app.get('/', (c) => c.text('Hello from Backend!'))

export default app
