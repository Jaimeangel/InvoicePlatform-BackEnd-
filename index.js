import express from 'express'
import connectDB from './config/db.js';

const App = express()
App.use(express.json())
const PORT = process.env.PORT || 5000;

const server =  App.listen(PORT,()=>{
    console.log(`run in port ${PORT}`)
})

connectDB()



