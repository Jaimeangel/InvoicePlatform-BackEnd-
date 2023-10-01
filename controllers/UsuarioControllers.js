import Usuario from "../models/Usuario.js"

const agregarUsuario= async (req,res)=>{
    const usuario= new Usuario(req.body)
    try {
        await usuario.save()
        return res.json(usuario)
    } catch (error) {
        const errorMsg= new Error('No fue posible crear el nuevo usuario')
        console.log(error)
        return res.status(403).json({msg:errorMsg.message})
    }
}
const obtenerUsuarios=(req,res)=>{
    return res.json('Mira obtenemos los usuarios')
}


export {
    agregarUsuario,
    obtenerUsuarios
}