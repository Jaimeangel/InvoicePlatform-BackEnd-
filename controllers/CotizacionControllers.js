import Cotizacion from '../models/Cotizacion.js'

const agregarCotizacion= async (req,res)=>{
    const proyecto= new Cotizacion(req.body)
    try {
        await proyecto.save()
        return res.json(proyecto)
    } catch (error) {
        const errorMsg= new Error('No fue posible crear el proyecto')
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
        const errorMsg= new Error('No fue posible obtener los proyectos')
        return res.status(403).json({msg:errorMsg.message})
    }
}

export {
    agregarCotizacion,
    obtenerCotizaciones
}