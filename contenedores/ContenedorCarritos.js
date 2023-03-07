import modelo from '../models/modelCarrito.js'
import { set, connect } from 'mongoose'

class ContenedorCarritosMongo {

    constructor() {

        set({ strictQuery: true })
        this.connect = connect('mongodb+srv://alvi:basealvi@proyectofinal.uj7wmlq.mongodb.net/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })

    }

    async save(Objeto) {
        try {
            await modelo.insertMany(Objeto)
            return Objeto.codigo;
        } catch (error) {
            throw new Error("Error en el agregado.");
        }
    }

    async getAll() {
        try {
            const carrs = await modelo.find()
            return carrs
        } catch (error) {
            console.log(error);
        }
    }

    async getById(cod) {
        try {
            const carr = await modelo.findOne({codigo: cod})
            return carr
        } catch (error) {
            throw new Error("Error en la busqueda por id.");
        }
    }

    async update(cod, Objeto) {
        try {
            await modelo.updateOne({codigo:cod}, 
                {productos: Objeto.productos}
                )
        } catch (error) {
            console.log(error);
        }
    }

    //Borrado de todo
    async deleteAll() {
        try {
            await modelo.deleteMany({})
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(cod) {
        try {
            await modelo.deleteOne({ codigo: cod })
        } catch (error) {
            console.log(error)
        }
    }

}

export default ContenedorCarritosMongo