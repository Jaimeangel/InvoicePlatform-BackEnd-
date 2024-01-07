// model
import Cotizacion from '../models/Cotizacion.js'

// aws helpers
import { postPdfToBucket } from '../AWS/s3PutObject.js';
import { GetPdfURLBucketPrivate } from '../AWS/s3GetObject.js';

// email helpers
import { poolEnviarEmail } from '../helpers/email/senders.js';
import { poolEnviarCelular } from '../helpers/celular/senders.js';
import extraerInformacion from '../helpers/extraerInformacion.js';


const agregarCotizacion = async (req,res)=>{
    const {user}=req;
    const cotizacion= new Cotizacion(req.body)
    cotizacion.creador=user._id

    try {
        await cotizacion.save()
        return res.json(cotizacion)
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

const enviarCotizacion = async (req,res)=>{
    const { pdf } = req.files
    const { user } = req;

    const { 
        contacto,
        cotizacion,
        cliente 
    } = req.body;
    
    const dataContacto = JSON.parse(contacto)
    const dataCotizacion = JSON.parse(cotizacion)
    const dataCliente = JSON.parse(cliente)

    const {
        nameUsuario,
        nameCliente
    } = extraerInformacion(user,dataCliente)

    if(pdf === null){
        const errorMsg= new Error('No files were uploaded.')
        return res.status(400).json({msg:errorMsg.message})
    }else{
        const dataFile=pdf.data;
        const nameFile=`${user._id}-document-pdf-444.pdf`;

        try {
/*             const response = await postPdfToBucket(dataFile,nameFile)
            const imagenURL = await GetPdfURLBucketPrivate(nameFile)
            return res.status(200).json({url:imagenURL}) */

/*             await poolEnviarEmail({
                usuario:nameUsuario,
                cliente:nameCliente,
                listaDestinario:dataContacto.email.destinos,
                referencia:dataCotizacion.numeroCotizacion,
                file:"https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf"
            }) */

            await poolEnviarCelular({
                cliente:nameCliente,
                listaDestinario:dataContacto.celular.destinos,
                referencia:dataCotizacion.numeroCotizacion,
                file:"https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf"
            })
        } catch (error) {
            const errorMsg= new Error('No fue posible subirlo al bucket de Amazon')
            return res.status(503).json({msg:errorMsg.message})
        }
        
    }
}

export {
    agregarCotizacion,
    obtenerCotizaciones,
    obtenerCotizacionByID,
    editarCotizacion,
    eliminarCotizacion,
    enviarCotizacion
}