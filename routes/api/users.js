const express = require("express");

const ctrl = require ("../../controlers/users")

const { ctrlWrapper,auth } = require("../../middlewares/index")


const shemas  = require("../../models/user");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;