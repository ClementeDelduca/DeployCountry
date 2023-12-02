const { Router } = require("express");

const { create, activityRouterGetHandler  } = require("../handlers/activity.handlers");

const activityRouter = Router();  //Crea una instancia de Router

activityRouter.post("/", create ); //Define una ruta POST

activityRouter.get("/", activityRouterGetHandler); //Define una ruta GET

module.exports = activityRouter;