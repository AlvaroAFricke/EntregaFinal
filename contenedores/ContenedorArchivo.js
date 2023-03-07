import { writeFileSync, readFileSync, promises } from "fs";

class ContenedorArchivo {

    constructor(nombreArchivo) {
        //Guardo el nombre del archivo
        this.archivo = nombreArchivo;
        writeFileSync(`../Archivos/${nombreArchivo}`, "[]");
    }

    getAll() {
        try {
            let array = JSON.parse(readFileSync(`../Archivos/${this.archivo}`, "utf-8"));
            return array;
        } catch (error) {
            console.log("Error en la lectura.");
            throw new Error("Error en la lectura.");
        }
    }

    //Borrado de todo
    deleteAll() {
        try {
            writeFileSync(`../Archivos/${this.archivo}`, "[]");
            console.log("Todo limpio.");
        } catch (error) {
            throw new Error("Error en la limpieza.");
        }
    }

    async save(Objeto) {
        try {
            let array = this.getAll();

            //Manipular el array
            array.push(Objeto);

            //Actualizo los datos del archivo
            await promises.writeFile(`../Archivos/${this.archivo}`, JSON.stringify(array));
            console.log("Agregado con exito.");

        } catch (error) {
            throw new Error("Error en el agregado");
        }

        return Objeto.id;
    }

    getById(number) {
        let array = this.getAll();

        for (let i = 0; i < array.length; i++) {
            if (array[i].id == number) {
                //Retorno el dato y corto el for
                return array[i]
                break
            }
        }
        return null;
    }

    async deleteById(number) {
        let array = this.getAll();

        try {
            array = array.filter((item) => item.id !== number);
            await promises.writeFile(`../Archivos/${this.archivo}`, JSON.stringify(array));
        } catch (error) {
            return null;
        }
    }

}

export default ContenedorArchivo