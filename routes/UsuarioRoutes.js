import express from 'express';
import {
    agregarUsuario,
    confirmacionUsuario,
    autenticarUsuario
} from '../controllers/UsuarioControllers.js'

import checkAuth from '../middlewares/checkAuth.js';

const router=express.Router();

router.post('/',agregarUsuario)
router.get('/confirmacion/:token',confirmacionUsuario)
router.post('/login',autenticarUsuario)


export default router;