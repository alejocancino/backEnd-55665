import express from 'express'
import {prodRouter} from './routes/index.js';

const PORT = 8080
const app = express();


app.use('/api/products', prodRouter)

app.listen(PORT,()=> {
  console.log(`Server on port: ${PORT}`)
})