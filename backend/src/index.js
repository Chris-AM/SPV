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
app.use(cors());

//Rutas("ruta", "archivo de ruta")
 app.use("/api/productos", require("./routes/productos.routes"));
//se inicia servidor
app.listen(port, ()=>{console.log("servidor en puerto", port)});
