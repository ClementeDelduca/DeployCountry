const { Router } = require("express");
const activityRouter = require("./activity.routes");
const countryRouter = require("./country.routes");

const router = Router();

router.use("/activities", activityRouter);
router.use("/countries", countryRouter);

module.exports = router;
