import { Schema, model } from 'mongoose' 

const productosCollName = 'productos'

const productosSchema = new Schema({

    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    imagen: {type: String, required: true},
    codigo: {type: String, required: true, unique: true},
    precio: {type: String, required: true},
    stock: {type: Number, required: true},
    time: {type: Date, require: true}
})

const productos = model(productosCollName, productosSchema)

export default productos