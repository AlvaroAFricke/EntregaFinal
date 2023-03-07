
import modelo from '../models/modelUsuario.js'
import { set, connect } from 'mongoose'

class ContenedorUsuarios {

    constructor() {

        set({ strictQuery: true })
        this.connect = connect('mongodb+srv://alvi:basealvi@proyectofinal.uj7wmlq.mongodb.net/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })

    }

    async getByUsername(username) {
        try {
            const usuario = await modelo.findOne({ username: username })
            return usuario
        } catch (error) {
            console.log(error);
        }
    }

    async save(Objeto) {
        try {
            await modelo.insertMany(Objeto)
        } catch (error) {
            console.log(error);
        }
        return Objeto.id;
    }

    async update(cod, Objeto) {
        // try {
        //     await modelo.updateOne({ codigo: cod }, { 
        //         nombre: Objeto.nombre,
        //         descripcion: Objeto.descripcion,
        //         imagen: Objeto.imagen,
        //         precio: Objeto.precio,
        //         stock: Objeto.stock
        //     })
        // } catch (error) {
        //     console.log(error);
        // }
    }

    async deleteById(cod) {
        // try {
        //     await modelo.deleteOne({ codigo: cod })
        // } catch (error) {
        //     console.log(error)
        // }
    }

}

export default ContenedorUsuarios