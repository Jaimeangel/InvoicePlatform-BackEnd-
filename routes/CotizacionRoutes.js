import express from 'express';
import {
    agregarCotizacion,
    obtenerCotizaciones
} from '../controllers/CotizacionControllers.js'

const router=express.Router();

router
    .route('/')
    .post(agregarCotizacion)
    .get(obtenerCotizaciones)


export default router;