//importando librerias
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {dbConfig} = require('./config/db.config')

//app levanta un servidor express
const app = express();
//port se declara puerto 
const port = process.env.PORT;
dbConfig();

//cors permite comparticion de recursos de origen cruzado 
app.use(cors());//permite que se pueda acceder a la api desde cualquier lugar
app.use(express.urlencoded({extended: true})); //permite recibir datos en formato json
app.use(express.json());    //permite que el servidor entienda los datos en formato json

//Rutas("ruta", "archivo de ruta")
app.use("/api/productos", require("./routes/producto.routes"));//ruta de productos
app.use("/api/departamentos", require("./routes/departamento.routes"));//ruta de departamentos
//app.use("/api/caja", require("./routes/caja.routes"));//ruta de cajas
//app.use("/api/cliente", require("./routes/cliente.routes"));//ruta de clientes
//se inicia servidor
app.listen(port, ()=>{console.log("servidor en puerto", port)});
