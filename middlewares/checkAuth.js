import Jwt  from "jsonwebtoken";
import Usuario from '../models/Usuario.js'

const checkAuth= async (req,res,next) => {
    let token;
    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ){
        try {
            token=req.headers.authorization.split(' ')[1]
            const decoded=Jwt.verify(token,process.env.JWT_SECRET)
            
            req.user = await Usuario.findById(decoded.id_user).select("-password -createdAt -updatedAt -confirmado -token -__v")

            return next()
        } catch (error) {
            return res.status(404).json(error)
        }
    }

    if(!token){
        const errorMsg= new Error('Token no valido')
        return res.status(401).json({msg:errorMsg.message})
    }

    next()
}

export default checkAuth;