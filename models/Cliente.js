import mongoose from "mongoose";

const clienteSchema=mongoose.Schema({
    tipo:{
        type:String,
        require:true,
        enum:["persona","empresa"]
    },
    tipoIdenti:{
        type:String,
        require:true,
        enum:["cedula","pasaporte","nit","cedula extranjera"]
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
    nombres:{
        type:String,
        trim:true
    },
    apellidos:{
        type:String,
        trim:true
    },
    razonSocial:{
        type:String,
        trim:true
    },
    nombreComercial:{
        type:String,
        trim:true
    },
    ciudad:{
        type:String,
        trim:true
    },
    direccion:{
        type:String,
        trim:true
    },
    nombreContacto:{
        type:String,
        trim:true,
        require:true,
    },
    apellidoContacto:{
        type:String,
        trim:true,
        require:true,
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
    tipoFiscal:{
        type:String,
        require:true,
        enum:["iva","no iva"]
    },
    creador:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    },
    departamento:{
        type:String,
        trim:true
    }
},
{ 
    timestamps: true 
})

const Cliente=mongoose.model('Cliente',clienteSchema)
export default Cliente;