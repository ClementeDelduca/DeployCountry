const { Router } = require("express");

const { countryRouterHandler, countryRouterIdHandler } = require("../handlers/country.handlers");

const countryRouter = Router(); //Crea una instancia de Router

countryRouter.get("/", countryRouterHandler); //Define una ruta GET

countryRouter.get("/:id", countryRouterIdHandler); //Define una ruta GET

module.exports = countryRouter;