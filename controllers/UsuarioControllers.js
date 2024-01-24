//models
import Usuario from "../models/Usuario.js"
//helpers
import generatorId from "../helpers/generatorId.js"
import generateToken from "../helpers/generateToken.js";
import {emailSenderConfirmAccount,emailSenderRecoverPassword } from '../helpers/email.js'
//AWS postObject
import {
    postImagenToBucket
} from "../AWS/s3PutObject.js";

import { 
    GetImagenURLBucketPublic
} from '../AWS/s3GetObject.js'

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

const recuperarPassword= async (req,res)=>{
    const {email}=req.body;
    const usuarioExiste= await Usuario.findOne({email})

    //Comprobar si el usuario existe
    if(!usuarioExiste){
        const errorMsg= new Error('El usuario no existe')
        return res.status(404).json({msg:errorMsg.message})
    }

    try {
        usuarioExiste.token=generatorId()
        await usuarioExiste.save()
        emailSenderRecoverPassword({
            "nombre":usuarioExiste.nombres,
            "email":usuarioExiste.email,
            "token":usuarioExiste.token
        })
        res.json({msg:"Hemos enviado un correo con las instrucciones para gestionar su contraseña"})
    } catch (error) {
        console.log(error)
    }
}

const verificarToken= async (req,res)=>{
    const {token}=req.params;
    const tokenValido = await Usuario.findOne({token})

    if(tokenValido){
        res.json({msg:"El token es valido"})
    }else{
        const errorMsg= new Error('El token no es valido')
        return res.status(404).json({msg:errorMsg.message})
    }
}

const cambiarPassword= async (req,res)=>{
    const {password}=req.body;
    const {token}=req.params;

    const usuario= await Usuario.findOne({token})

    try {
        usuario.password=password
        usuario.token=''
        await usuario.save()
        res.json({msg:'Su clave ha sido cambiada con exito'})
    } catch (error) {
        console.log(error)
    }

}

const cargarImageneUsuarioProfile = async (req,res)=>{
    const {image} = req.files;
    const {user} = req;
    const usuario = await Usuario.findOne({_id:user._id})

    if(!req.files){
        const errorMsg= new Error('No files were uploaded.')
        return res.status(400).json({msg:errorMsg.message})
    }else{
        const dataFile=image.data;
        const nameFile=`${user._id}-image-profile`;

        try {
            const response = await postImagenToBucket(dataFile,nameFile)
            const imagenURL = await GetImagenURLBucketPublic(nameFile)
            try {
                usuario.images.profileImange.url=imagenURL
                await usuario.save()
                res.status(200).send('Imagen subida con exito')
            } catch (error) {
                const errorMsg= new Error('algo salio mal de nuestro lado, no fue posible actualizar DB')
                return res.status(503).json({msg:errorMsg.message})
            }

        } catch (error) {
            const errorMsg= new Error('No fue posible subirlo al bucket de Amazon')
            return res.status(503).json({msg:errorMsg.message})
        }
        
    }
}

const cargarImageneUsuarioCotizacion = async (req,res)=>{
    const {image} = req.files;
    const {user} = req;
    const usuario = await Usuario.findOne({_id:user._id})

    if(!req.files){
        const errorMsg= new Error('No files were uploaded.')
        return res.status(400).json({msg:errorMsg.message})
    }else{
        const dataFile=image.data;
        const nameFile=`${user._id}-image-cotizacion`;

        try {
            const response = await postImagenToBucket(dataFile,nameFile)
            const imagenURL = await GetImagenURLBucketPublic(nameFile)
            try {
                usuario.images.cotizacionImage.url=imagenURL
                await usuario.save()
                res.status(200).send('Imagen subida con exito')
            } catch (error) {
                const errorMsg= new Error('algo salio mal de nuestro lado, no fue posible actualizar DB')
                return res.status(503).json({msg:errorMsg.message})
            }

        } catch (error) {
            const errorMsg= new Error('No fue posible subirlo al bucket de Amazon')
            return res.status(503).json({msg:errorMsg.message})
        }
        
    }
}

const cargarImageneUsuarioFirmaDigital = async (req,res)=>{
    const {image} = req.files;
    const {user} = req;
    const usuario = await Usuario.findOne({_id:user._id})

    if(!req.files){
        const errorMsg= new Error('No files were uploaded.')
        return res.status(400).json({msg:errorMsg.message})
    }else{
        const dataFile=image.data;
        const nameFile=`${user._id}-image-firma-digital`;

        try {
            const response = await postImagenToBucket(dataFile,nameFile)
            const imagenURL = await GetImagenURLBucketPublic(nameFile)
            try{
                usuario.images.firmaRepresentante.url=imagenURL
                await usuario.save()
                res.status(200).send('Imagen subida con exito')
            }catch(error){
                const errorMsg= new Error('algo salio mal de nuestro lado, no fue posible actualizar DB')
                return res.status(503).json({msg:errorMsg.message})
            }

        }catch(error){
            const errorMsg= new Error('No fue posible subirlo al bucket de Amazon')
            return res.status(503).json({msg:errorMsg.message})
        }
        
    }
}

const perfil = async (req,res)=>{
    const {user}= req;
    res.json(user)
}

export {
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
}