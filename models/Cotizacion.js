import mongoose from "mongoose";

const cotizacionSchema=mongoose.Schema({
    cliente:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cliente'
    },
    fecha:{
        type:Date,
        default:Date.now()
    },
    creador:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    },
    productos:[
        {
            nombre:{
                type:String,
                required: true,
            },
            cantidad:{
                type:Number,
                required: true,
                validate:{
                    validator: function(value){
                      return value >= 0;
                    },
                    message:"La cantidad debe ser un número positivo",
                }
            },
            precioUnitario:{
                type:Number,
                trim:true,
                required: true,
                validate:{
                    validator: function(value){
                      return value >= 0;
                    },
                    message:"El precio unitario debe ser un número positivo",
                }
            },
        }
    ],
    valorTotal:{
        type:Number,
        required: true,
        validate:{
            validator: function(value){
              return value >= 0;
            },
            message:"La cantidad debe ser un número positivo",
        }
    },
    subTotal:{
        type:Number,
        required: true,
        validate:{
            validator: function(value){
              return value >= 0;
            },
            message:"La cantidad debe ser un número positivo",
        }
    },
    IVA:{
        type:Number,
        required: true,
        validate:{
            validator: function(value){
              return value >= 0;
            },
            message:"La cantidad debe ser un número positivo",
        }
    },
    notas:{
        type:String,
        trim:true
    },
    condiciones:{
        type:String,
        trim:true
    }
},
{ 
    timestamps: true 
})

const Cotizacion=mongoose.model('Cotizacion',cotizacionSchema)
export default Cotizacion;