import Cliente from '../models/Cliente.js'

const agregarCliente= async (req,res)=>{
    const {user}=req;
    const cliente= new Cliente(req.body)
    cliente.creador=user._id
    try {
        await cliente.save()
        return res.json(cliente)
    } catch (error) {
        const errorMsg= new Error('No fue posible crear el cliente')
        console.log(error)
        return res.status(403).json({msg:errorMsg.message})
    }
}

const obtenerClientes= async (req,res)=>{
    const {user}=req;
    try {
        const clientesByUsuario= await Cliente.find({creador:user._id})
        return res.json(clientesByUsuario)
    } catch (error) {
        console.log(error)
        const errorMsg= new Error('No fue posible obtener los clientes')
        return res.status(403).json({msg:errorMsg.message})
    }
}

const obtenerClienteByID= async (req,res)=>{
    const {cliente} = req.params;
    const {user}=req;
    try {
        const clienteByID = await Cliente.findById(cliente)  

        if(clienteByID.creador.toString() !== user._id.toString()){
            const errorMsg= new Error('No tienes los permisos para acceder al cliente')
            return res.status(401).json({msg:errorMsg.message})
        }
    
        return res.json(clienteByID)
    } catch (error) {
        const errorMsg= new Error('No encontramos el cliente al cual quiere acceder')
        console.log(error)
        return res.status(404).json({msg:errorMsg.message})
    }
}

const editarCliente= async (req,res)=>{
    const {cliente} = req.params;
    const {user}=req;
    try {
        const clienteByID = await Cliente.findById(cliente)

        if(clienteByID.creador.toString() !== user._id.toString()){
            const errorMsg= new Error('No tienes los permisos para editar el cliente')
            return res.status(401).json({msg:errorMsg.message})
        }

        const valueToUpdate= Object.keys(req.body)
        valueToUpdate.forEach(value =>{
            if(value in clienteByID){
                clienteByID[value]=req.body[value]
            }
        })
        
        try {
            await clienteByID.save()
            res.json(clienteByID)
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        const errorMsg= new Error('Lo sentimos, el cliente que trata editar no existe')
        console.log(error)
        return res.status(404).json({msg:errorMsg.message})
    }
}

const eliminarCliente= async (req,res)=>{
    const {cliente} = req.params;
    const {user}=req;
    try {
        const clienteByID = await Cliente.findById(cliente)

        if(clienteByID.creador.toString() !== user._id.toString()){
            const errorMsg= new Error('No tienes los permisos para esta accion')
            return res.status(401).json({msg:errorMsg.message})
        }

        
        try {
            await clienteByID.deleteOne()
            res.json({msg:"El cliente se elimino con exito"})
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        console.log(error)
        const errorMsg= new Error('Lo sentimos, el cliente que trata de eliminar no existe')
        return res.status(404).json({msg:errorMsg.message})
    }
}

export {
    agregarCliente,
    obtenerClientes,
    obtenerClienteByID,
    editarCliente,
    eliminarCliente
}