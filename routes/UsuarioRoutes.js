import express from 'express';
import {
    agregarUsuario,
    obtenerUsuarios
} from '../controllers/UsuarioControllers.js'

const router=express.Router();

router
    .route('/')
    .post(agregarUsuario)
    .get(obtenerUsuarios)


export default router;