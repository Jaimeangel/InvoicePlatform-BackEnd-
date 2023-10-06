import Cotizacion from '../models/Cotizacion.js'

const agregarCotizacion= async (req,res)=>{
    const proyecto= new Cotizacion(req.body)
    try {
        await proyecto.save()
        return res.json(proyecto)
    } catch (error) {
        const errorMsg= new Error('No fue posible crear la cotizacion')
        console.log(error)
        return res.status(403).json({msg:errorMsg.message})
    }
}

const obtenerCotizaciones= async (req,res)=>{
    const {user}=req;
    try {
        const cotizacionUsuario= await Cotizacion.find({creador:user._id})
        return res.json(cotizacionUsuario)
    } catch (error) {
        console.log(error)
        const errorMsg= new Error('No fue posible obtener las cotizaciones')
        return res.status(403).json({msg:errorMsg.message})
    }
}

const obtenerCotizacionByID= async (req,res)=>{
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

const editarCotizacion=(req,res)=>{

}

const eliminarCotizacion=(req,res)=>{

}

export {
    agregarCotizacion,
    obtenerCotizaciones,
    obtenerCotizacionByID,
    editarCotizacion,
    eliminarCotizacion
}