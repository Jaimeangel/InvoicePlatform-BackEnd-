import express from 'express'
import connectDB from './config/db.js';
//Routes models
import CotizacionesRoutes from './routes/CotizacionRoutes.js'
import UsuariosRoutes from './routes/UsuarioRoutes.js'

const App = express()
App.use(express.json())
const PORT = process.env.PORT || 5000;

//Routing
App.use('/api/cotizaciones',CotizacionesRoutes)
App.use('/api/usuarios',UsuariosRoutes)

const server =  App.listen(PORT,()=>{
    console.log(`run in port ${PORT}`)
})

connectDB()



