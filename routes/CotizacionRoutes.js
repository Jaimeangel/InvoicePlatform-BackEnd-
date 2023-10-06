import express from 'express';
import {
    agregarCotizacion,
    obtenerCotizaciones
} from '../controllers/CotizacionControllers.js'

import checkAuth from '../middlewares/checkAuth.js';

//Router
const router=express.Router();

//agrega/obtiene cotizaciones
router
    .route('/')
    .post(checkAuth,agregarCotizacion)
    .get(checkAuth,obtenerCotizaciones)


export default router;