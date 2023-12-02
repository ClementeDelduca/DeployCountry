const { createActivity, getAllActivity } = require("../controllers/activity.controllers");

const create = async function(req, res, next) {   //Define una función asincrónica
    try{
        const dataBody = await createActivity(req.body)
        res.status(200).send(dataBody)
    } catch(e) {
        next(e)
    }
    
}

const activityRouterGetHandler = async (req, res) => {  //Define una función asincrónica
    const {name} = req.query;
    try{
    const results = await getAllActivity();
    res.status(200).json(results);
}   catch (error) {
    res.status(400).json({error: error.message});
    }
};

module.exports = {
    create,
    activityRouterGetHandler
}