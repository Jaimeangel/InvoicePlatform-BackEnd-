import express from 'express';
import {
    agregarCotizacion,
    obtenerCotizaciones,
    obtenerCotizacionByID,
    editarCotizacion,
    eliminarCotizacion,
    guardarCotizacion,
    enviarCotizacionMovil,
    enviarCotizacionEmail
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

router.post('/guardar-cotizacion',checkAuth,guardarCotizacion)

router.post('/enviar-cotizacion-movil',checkAuth,enviarCotizacionMovil)
router.post('/enviar-cotizacion-email',checkAuth,enviarCotizacionEmail)

export default router;