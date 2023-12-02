const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json()); //para permitir el análisis del cuerpo de las solicitudes entrantes en formato JSON
server.use(cors()); //permitir el intercambio de recursos entre dominios o rutas

server.use(router); // Utiliza las rutas definidas en el módulo router.

module.exports = server;
