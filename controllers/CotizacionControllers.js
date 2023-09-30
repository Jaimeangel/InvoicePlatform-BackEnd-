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
const obtenerCotizaciones=(req,res)=>{
    return res.json('Mira obtenemos las cotizaciones')
}


export {
    agregarCotizacion,
    obtenerCotizaciones
}