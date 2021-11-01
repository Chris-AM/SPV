require("dotenv").config();
const express = require("express");
const cors = require("cors");


const app = express();
const port = process.env.PORT;


app.use(cors());
//se inicia servidor
app.listen(port, ()=>{console.log("servidor en puerto", port)});
