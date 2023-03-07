//Imports
import express from 'express'
import logger from "./utils/logger.js";
const app = express()

//Dependencias de la app

import rutasCarritos from "./rutas/rutasCarritos.js"
import rutasProductos from "./rutas/rutasProductos.js"
import rutasLoggin from "./rutas/rutasLoggin.js"

app.use(rutasCarritos)
app.use(rutasProductos)
app.use(rutasLoggin)

//Puerto
const PORT = 8080

//Escucha del servidor
app.listen(PORT, () => {
    logger.info("Servidor Corriendo")
})

export default app
