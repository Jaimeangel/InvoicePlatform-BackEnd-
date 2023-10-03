//models
import Usuario from "../models/Usuario.js"
//helpers
import generatorId from "../helpers/generatorId.js"
import generateToken from "../helpers/generateToken.js";
import {emailSenderConfirmAccount,emailSenderRecoverPassword } from '../helpers/email.js'

const agregarUsuario= async (req,res)=>{
    const {email}=req.body;
    const usuarioExiste= await Usuario.findOne({email})

    if(usuarioExiste){
        const error = new Error('Este email de usuario ya esta registrado, por favor ingrese otro email')
        return res.status(409).json({msg:error.message})
    }

    try {
        const nuevoUsuario= new Usuario(req.body);
        nuevoUsuario.token= generatorId()
        await nuevoUsuario.save()

        emailSenderConfirmAccount({
            "nombre":nuevoUsuario.nombre,
            "email":nuevoUsuario.email,
            "token":nuevoUsuario.token
        })

        res.send({msg:'Hemos enviado un correo de confirmacion para terminar tu registro'})
    } catch (error) {
        const errorMsg= new Error('algo salio mal de nuestro lado, intentalo de nuevo o mas tarde')
        return res.status(503).json({msg:errorMsg.message})
    }
}

const confirmacionUsuario= async (req,res)=>{
    const {token}=req.params;
    const usuarioToken = await Usuario.findOne({token})

    if(!usuarioToken){
        const errorMsg= new Error('El token de confirmacion ha expirado')
        return res.status(403).json({msg:errorMsg.message})
    }

    try{
        usuarioToken.confirmado=true
        usuarioToken.token=''
        await usuarioToken.save()
        res.status(200).json(usuarioToken)
    }catch(error){
        const errorMsg= new Error('algo salio mal de nuestro lado, intentalo de nuevo o mas tarde')
        return res.status(503).json({msg:errorMsg.message})
    }
}

const autenticarUsuario= async (req,res)=>{
    const {email,password}=req.body;
    const usuarioExiste= await Usuario.findOne({email})

    //Comprobar si el usuario existe
    if(!usuarioExiste){
        const errorMsg= new Error('El usuario no esta registrado')
        return res.status(404).json({msg:errorMsg.message})
    }

    //Comprobar si el usuario esta confirmado
    if(!usuarioExiste.confirmado){
        const errorMsg= new Error('El usuario aun no esta confirmado, revisa tu correo y confirma tu cuenta')
        return res.status(403).json({msg:errorMsg.message})
    }

    if(await usuarioExiste.authenticatePassword(password)){
        return res.status(200).json({
            _id:usuarioExiste._id,
            nombre:usuarioExiste.nombre,
            email:usuarioExiste.email,
            token:generateToken(usuarioExiste._id)
        })

    }else{
        const errorMsg= new Error('La contraseña es incorrecta')
        return res.status(403).json({msg:errorMsg.message})
    }
}


export {
    agregarUsuario,
    confirmacionUsuario,
    autenticarUsuario
}