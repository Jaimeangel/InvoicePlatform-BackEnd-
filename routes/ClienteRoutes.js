import express from 'express';
import {
    agregarCliente,
    obtenerClientes
} from '../controllers/ClienteControllers.js'

const router=express.Router();

router
    .route('/')
    .post(agregarCliente)
    .get(obtenerClientes)


export default router;