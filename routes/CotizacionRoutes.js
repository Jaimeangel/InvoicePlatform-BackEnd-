import express from 'express';
import {
    agregarCotizacion,
    obtenerCotizaciones,
    obtenerCotizacionByID,
    editarCotizacion,
    eliminarCotizacion
} from '../controllers/CotizacionControllers.js'

import checkAuth from '../middlewares/checkAuth.js';

//Router
const router=express.Router();

//agrega/obtiene cotizaciones
router
    .route('/')
    .post(checkAuth,agregarCotizacion)
    .get(checkAuth,obtenerCotizaciones)

//operaciones para cotizacion por id
router
    .route('/:cotizacion')
    .get(checkAuth,obtenerCotizacionByID)
    .put(checkAuth,editarCotizacion)
    .delete(checkAuth,eliminarCotizacion)

export default router;