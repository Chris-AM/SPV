//importando librerias
require("dotenv").config();
const express = require("express");
const cors = require("cors");

//app levanta un servidor express
const app = express();
//port se declara puerto 
const port = process.env.PORT;

//cors permite comparticion de recursos de origen cruzado 
app.use(cors());
//se inicia servidor
app.listen(port, ()=>{console.log("servidor en puerto", port)});
