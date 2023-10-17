import mongoose from "mongoose";

const clienteSchema=mongoose.Schema({
    tipo:{
        type:String,
        require:true,
        enum:["persona","empresa"]
    },
    identificacion:{
        type:Number,
        require:true,
        trim:true
    },
    digitVerify:{
        type:Number,
        trim:true
    },
    razonSocial:{
        type:String,
        trim:true
    },
    nombres:{
        type:String,
        trim:true
    },
    apellidos:{
        type:String,
        trim:true
    },
    ciudad:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true,
        match: /^\S+@\S+\.\S+$/
    },
    celular:{
        type:Number,
    },
    creador:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    }
},
{ 
    timestamps: true 
})

const Cliente=mongoose.model('Cliente',clienteSchema)
export default Cliente;