import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const usuarioSchema=mongoose.Schema({
    razonSocial:{
        type:String,
        trim:true
    },
    nit:{
        type:Number,
        trim:true
    },
    identificacion:{
        type:Number,
        trim:true
    },
    nombres:{
        type:String,
        require:true,
        trim:true
    },
    apellidos:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    token:{
        type:String
    },
    confirmado:{
        type:Boolean,
        default:false
    },
    ciudad:{
        type:String,
        trim:true
    },
    departamento:{
        type:String,
        trim:true
    },
    tipo:{
        type:String,
        require:true,
        enum:["persona","empresa"]
    },
    digitVerify:{
        type:Number,
        trim:true
    },
    nombreComercial:{
        type:String,
        trim:true
    },
    direccion:{
        type:String,
        trim:true
    },
    celularEmpresarial:{
        type:Number,
    },
    tipoFiscal:{
        type:String,
        require:true,
        enum:["iva","no iva"]
    },
    tipoIdenti:{
        type:String,
        require:true,
        enum:["cedula","pasaporte","nit","cedula extranjera"]
    },
    cargoRepresentante:{
        type:String,
        trim:true
    },
    emailRepresentante:{
        type:String,
        trim:true,
    },
    celularRepresentante:{
        type:Number,
    },
},
{ 
    timestamps: true 
});

usuarioSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    } 

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

usuarioSchema.methods.authenticatePassword= async function(passwordUserForm){
    return await bcrypt.compare(passwordUserForm,this.password)
}

const Usuario=mongoose.model('Usuario',usuarioSchema)
export default Usuario;