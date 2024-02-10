// model
import Cotizacion from '../models/Cotizacion.js'
import Cliente from '../models/Cliente.js'

// aws helpers
import { postPdfToBucket } from '../AWS/s3PutObject.js';
import { GetPdfURLBucketPrivate } from '../AWS/s3GetObject.js';

// email helpers
import { poolEnviarEmail } from '../helpers/email/senders.js';
import { poolEnviarCelular } from '../helpers/celular/senders.js';
import extraerInformacion from '../helpers/extraerInformacion.js';


const agregarCotizacion = async (data)=>{
    const cotizacion= new Cotizacion(data)
    try {
        await cotizacion.save()
        return res.status(200).json({cotizacion:cotizacion})
    } catch (error) {
        const errorMsg= new Error('No fue posible crear la cotizacion')
        console.log(error)
        return res.status(403).json({msg:errorMsg.message})
    }
}

const obtenerCotizaciones = async (req,res)=>{
    const {user}=req;
    try {
        const cotizacionesByUsuario= await Cotizacion.find({creador:user._id})
        return res.json({
            cotizaciones : cotizacionesByUsuario,
            lengthCotizaciones: Object.keys(cotizacionesByUsuario).length
        })
    } catch (error) {
        console.log(error)
        const errorMsg= new Error('No fue posible obtener las cotizaciones')
        return res.status(403).json({msg:errorMsg.message})
    }
}

const obtenerCotizacionByID = async (req,res)=>{
    const {cotizacion} = req.params;
    const {user}=req;
    try {
        const cotizacionByID = await Cotizacion.findById(cotizacion)  

        if(cotizacionByID.creador.toString() !== user._id.toString()){
            const errorMsg= new Error('No tienes los permisos para acceder a la cotizacion')
            return res.status(401).json({msg:errorMsg.message})
        }
    
        return res.json(cotizacionByID)
    } catch (error) {
        const errorMsg= new Error('No encontramos la cotizacion a la cual quiere acceder')
        console.log(error)
        return res.status(404).json({msg:errorMsg.message})
    }
}

const editarCotizacion = async (req,res)=>{
    const {cotizacion} = req.params;
    const {user}=req;
    try {
        const cotizacionByID = await Cotizacion.findById(cotizacion)

        if(cotizacionByID.creador.toString() !== user._id.toString()){
            const errorMsg= new Error('No tienes los permisos para editar la cotizacion')
            return res.status(401).json({msg:errorMsg.message})
        }

        const valueToUpdate= Object.keys(req.body)
        valueToUpdate.forEach(value =>{
            if(value in cotizacionByID){
                cotizacionByID[value]=req.body[value]
            }
        })
        
        try {
            await cotizacionByID.save()
            res.json(cotizacionByID)
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        const errorMsg= new Error('Lo sentimos, la cotizacion que trata editar no existe')
        console.log(error)
        return res.status(404).json({msg:errorMsg.message})
    }
}

const eliminarCotizacion = async (req,res)=>{
    const {cotizacion} = req.params;
    const {user}=req;
    try {
        const cotizacionByID = await Cotizacion.findById(cotizacion)

        if(cotizacionByID.creador.toString() !== user._id.toString()){
            const errorMsg= new Error('No tienes los permisos para esta accion')
            return res.status(401).json({msg:errorMsg.message})
        }

        
        try {
            await cotizacionByID.deleteOne()
            res.json({msg:"La cotizacion se elimino con exito"})
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        console.log(error)
        const errorMsg= new Error('Lo sentimos, la cotizacion que trata de eliminar no existe')
        return res.status(404).json({msg:errorMsg.message})
    }
}

const guardarCotizacion = async (req,res)=>{
    const { pdf } = req.files
    const { user } = req;

    const {
        cotizacion
    } = req.body;
    
    const dataCotizacion = JSON.parse(cotizacion)

    if(pdf === null){
        const errorMsg= new Error('No files were uploaded.')
        return res.status(400).json({msg:errorMsg.message})
    }else{
        const dataFile=pdf.data;
        const nameFile=`${user._id}-document-pdf-cotizacion-${dataCotizacion.numeroCotizacion}.pdf`;

        try {
            const guardarPdfBucket = await postPdfToBucket(dataFile,nameFile)

            try {
                const cotizacion = new Cotizacion(dataCotizacion)
                cotizacion.nameFileCotizacionBucket = nameFile
                await cotizacion.save()

                return res.status(200).json({
                    msg:'cotizacion enviada con exito',
                    idCotizacion:cotizacion._id
                })
            } catch (error) {
                console.log(error)
                const errorMsg= new Error('No fue posible guardar tu cotizacion, intentalo de nuevo')
                return res.status(503).json({msg:errorMsg.message})
            }
        } catch (error) {
            const errorMsg= new Error('No fue posible guardar tu pdf, intentalo de nuevo')
            return res.status(503).json({msg:errorMsg.message})
        }
        
    }
}

const enviarCotizacionMovil = async (req,res) => {
    const { user } = req;

    const {
        ID
    } = req.body;

    const id = JSON.parse(ID)

    let cotizacionByID;
    let clienteByID;

    try {
        cotizacionByID = await Cotizacion.findById(id)
    } catch (error) {
        const errorMsg= new Error('No encontramos la cotizacion solicitada')
        return res.status(503).json({msg:errorMsg.message})
    }

    try {
        clienteByID = await Cliente.findById(cotizacionByID.cliente)   
    } catch (error) {
        const errorMsg= new Error('No encontramos el cliente solicitado')
        return res.status(503).json({msg:errorMsg.message})
    }


    const {
        nameUsuario,
        nameCliente
    } = extraerInformacion(user,clienteByID)

    try {
        const imagenURL = await GetPdfURLBucketPrivate(cotizacionByID.nameFileCotizacionBucket)

        try {
            await poolEnviarCelular({
                cliente:nameCliente,
                listaDestinario:cotizacionByID.celular.destinos,
                referencia:cotizacionByID.numeroCotizacion,
                file:imagenURL
            })

            return res.status(200).json({msg:'cotizacion enviada con exito'})
        } catch (error) {
            const errorMsg= new Error('No fue posible enviar tu cotizacion, intentalo de nuevo')
            return res.status(503).json({msg:errorMsg.message})
        }
    } catch (error) {
        const errorMsg= new Error('No pudimos obtener URL cotizacion')
        return res.status(503).json({msg:errorMsg.message})
    }
}

const enviarCotizacionEmail= async (req,res)=>{
    const {
        cotizacion,
        cliente 
    } = req.body;
    
    const dataCotizacion = JSON.parse(cotizacion)
    const dataCliente = JSON.parse(cliente)

    const {
        nameUsuario,
        nameCliente
    } = extraerInformacion(user,dataCliente)

    try {
        const imagenURL = await GetPdfURLBucketPrivate(nameFile)

        try {

            await poolEnviarEmail({
                usuario:nameUsuario,
                cliente:nameCliente,
                listaDestinario:dataCotizacion.email.destinos,
                referencia:dataCotizacion.numeroCotizacion,
                file:imagenURL
            })

            return res.status(200).json({msg:'cotizacion enviada con exito'})
        } catch (error) {
            const errorMsg= new Error('No fue posible enviar tu cotizacion, intentalo de nuevo')
            return res.status(503).json({msg:errorMsg.message})
        }
    } catch (error) {
        const errorMsg= new Error('No pudimos obtener URL cotizacion')
        return res.status(503).json({msg:errorMsg.message})
    }
}

export {
    agregarCotizacion,
    obtenerCotizaciones,
    obtenerCotizacionByID,
    editarCotizacion,
    eliminarCotizacion,
    guardarCotizacion,
    enviarCotizacionMovil,
    enviarCotizacionEmail
}