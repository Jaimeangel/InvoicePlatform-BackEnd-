import express from 'express';
import {
    agregarCliente,
    obtenerClientes,
    obtenerClienteByID,
    editarCliente,
    eliminarCliente
} from '../controllers/ClienteControllers.js'

import checkAuth from '../middlewares/checkAuth.js';

//Router
const router=express.Router();

//agrega/obtiene clientes
router
    .route('/')
    .post(checkAuth,agregarCliente)
    .get(checkAuth,obtenerClientes)

//operaciones para clientes por id
router
    .route('/:cliente')
    .get(checkAuth,obtenerClienteByID)
    .put(checkAuth,editarCliente)
    .delete(checkAuth,eliminarCliente)


export default router;