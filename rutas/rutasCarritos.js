import express, { json, urlencoded } from "express";
const { Router } = express;
import Carrito from "../utils/Carrito.js";
import MongoCarritos from "../contenedores/ContenedorCarritos.js";
import MongoProductos from "../contenedores/ContenedorProductos.js";


const baseProductos = new MongoProductos()
const baseCarritos = new MongoCarritos()

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

const routerCarrito = new Router();

app.use("/api/carritos", routerCarrito);


/**
 * Rutas de Carrito
 */

routerCarrito.get("/:id?/productos", async (req, res) => {

    const cod = Number(req.params.id);
    if (cod) {
        const carrito = await baseCarritos.getById(cod)
        res.json(carrito.productos)
    } else {
        res.json(await baseCarritos.getAll())
    }

});

routerCarrito.post("/", async (req, res) => {

    const carrito = new Carrito();
    res.json(await baseCarritos.save(carrito))

});

routerCarrito.post('/:idCar/productos/:idProd', async (req,res) => {

    const idCar = Number(req.params.idCar);
    const carrito = await baseCarritos.getById(idCar)

    const idProd = Number(req.params.idProd);
    carrito.productos.push(await baseProductos.getById(idProd))

    await baseCarritos.update(idCar, carrito);

    res.json({ProductoAgregado:'OK'})

});

routerCarrito.delete("/:id?/productos", async (req, res) => {

    const cod = Number(req.params.id);
    if (cod) {
        await baseCarritos.deleteById(cod)
        res.json({Borrado: "OK"})
    } else {
        await baseCarritos.deleteAll()
        res.json({Borrado: "OK"})
    }

});

routerCarrito.delete('/:idCar/productos/:idProd', async (req, res) => {
    
    const idCar = Number(req.params.idCar);
    const carrito = await baseCarritos.getById(idCar)

    const idProd = Number(req.params.idProd);

    carrito.productos = carrito.productos.filter((producto) => producto.codigo != idProd)

    await baseCarritos.update(idCar, carrito);

    res.json({ProductoEliminado:'OK'})

});

export default app;
