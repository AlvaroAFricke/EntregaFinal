class Carrito{

    static codigo = 0

    constructor() {

        Carrito.codigo++
        this.codigo = Carrito.codigo
        this.time = Date.now()

        this.productos = new Array()
    
    }

    getId(){
        return this.codigo
    }

}

export default Carrito