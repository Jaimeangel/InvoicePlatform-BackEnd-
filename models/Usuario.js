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
        require:true,
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
    }
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