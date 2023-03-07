class Producto {

    static idGeneral = 0

    constructor(nombre, descripcion, imagen, codigo, precio, stock) {

        Producto.idGeneral++
        this.id = Producto.idGeneral

        this.nombre = nombre
        this.descripcion = descripcion
        this.imagen = imagen
        this.codigo = codigo
        this.precio = precio
        this.stock = stock

        this.time = Date.now()
    
    }

}

export default Producto