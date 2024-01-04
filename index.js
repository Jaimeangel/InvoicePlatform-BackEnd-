import express from 'express'
import connectDB from './config/db.js';
//Routes models
import CotizacionesRoutes from './routes/CotizacionRoutes.js'
import UsuariosRoutes from './routes/UsuarioRoutes.js'
import ClientesRoutes from './routes/ClienteRoutes.js'
//cors
import cors from 'cors'
//fileuploads
import fileUpload from 'express-fileupload';

import { GetPdfURLBucketPrivate } from './AWS/s3GetObject.js';

const App = express()
App.use(express.json())
const PORT = process.env.PORT || 5000;

const whitelist = ['http://localhost:5173','http://localhost:5174']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

App.use(cors(corsOptions))
App.use(fileUpload());
//Routing
App.use('/api/cotizaciones',CotizacionesRoutes)
App.use('/api/usuarios',UsuariosRoutes)
App.use('/api/clientes',ClientesRoutes)

const server =  App.listen(PORT,()=>{
    console.log(`run in port ${PORT}`)
})

connectDB()



