import { Schema, model } from 'mongoose' 

const usuariosCollName = 'usuarios'

const usuariosSchema = new Schema({

    username: {type: String, required: true},
    direccion: {type: String, required: true},
    edad: {type: Number, required: true},
    telefono: {type: Number, required: true},
    password: {type: String, require: true}
})

const usuarios = model(usuariosCollName, usuariosSchema)

export default usuarios