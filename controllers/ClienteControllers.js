import Cliente from '../models/Cliente.js'

const agregarCliente= async (req,res)=>{
    const cliente= new Cliente(req.body)
    try {
        await cliente.save()
        return res.json(cliente)
    } catch (error) {
        const errorMsg= new Error('No fue posible crear el cliente')
        console.log(error)
        return res.status(403).json({msg:errorMsg.message})
    }
}
const obtenerClientes=(req,res)=>{
    return res.json('Mira obtenemos los nuevos clientes')
}


export {
    agregarCliente,
    obtenerClientes
}