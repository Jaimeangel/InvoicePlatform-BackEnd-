import express from 'express';
import {
    agregarUsuario,
    confirmacionUsuario,
    autenticarUsuario,
    recuperarPassword,
    verificarToken,
    cambiarPassword
} from '../controllers/UsuarioControllers.js'

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


export default router;