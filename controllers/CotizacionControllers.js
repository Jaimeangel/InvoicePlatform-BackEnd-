import Cotizacion from '../models/Cotizacion.js'

const agregarCotizacion= async (req,res)=>{
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

const obtenerCotizaciones= async (req,res)=>{
    const {user}=req;
    try {
        const cotizacionesByUsuario= await Cotizacion.find({creador:user._id})
        return res.json(cotizacionesByUsuario)
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

const editarCotizacion= async (req,res)=>{
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

const eliminarCotizacion= async (req,res)=>{
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

export {
    agregarCotizacion,
    obtenerCotizaciones,
    obtenerCotizacionByID,
    editarCotizacion,
    eliminarCotizacion
}