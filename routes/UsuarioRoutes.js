import express from 'express';
import {
    agregarUsuario,
    confirmacionUsuario,
    autenticarUsuario,
    recuperarPassword,
    verificarToken,
    cambiarPassword,
    perfil
} from '../controllers/UsuarioControllers.js'

//middleware
import checkAuth from '../middlewares/checkAuth.js';

//Router
const router=express.Router();
//registrar y autenticar usuario
router.post('/',agregarUsuario)
router.get('/confirmacion/:token',confirmacionUsuario)
//login usuario
router.post('/login',autenticarUsuario)
//Recuperar contraseña
router.post('/recuperar-password',recuperarPassword)
router
    .route('/recuperar-password/:token')
    .get(verificarToken)
    .post(cambiarPassword)
//obtener perfil
router.get('/perfil',checkAuth,perfil)

export default router;