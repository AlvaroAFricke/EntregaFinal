import { Schema, model } from 'mongoose' 

const carritosCollName = 'carritos'

const carritosSchema = new Schema({
    codigo: {type: Number, require: true, unique: true},
    time: {type: Date, required: true},
    productos: {type: Array, required: true}
})

const carritos = model(carritosCollName, carritosSchema)

export default carritos