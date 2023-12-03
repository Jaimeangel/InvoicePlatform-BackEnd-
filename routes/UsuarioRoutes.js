import express from 'express';
import {
    agregarUsuario,
    confirmacionUsuario,
    autenticarUsuario,
    recuperarPassword,
    verificarToken,
    cambiarPassword,
    perfil,
    cargarImageneUsuarioProfile,
    cargarImageneUsuarioCotizacion,
    cargarImageneUsuarioFirmaDigital
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
//cargar imagenes
router.post('/imagenes-upload-profile',checkAuth,cargarImageneUsuarioProfile)
router.post('/imagenes-upload-cotizacion',checkAuth,cargarImageneUsuarioCotizacion)
router.post('/imagenes-upload-firma-digital',checkAuth,cargarImageneUsuarioFirmaDigital)

export default router;