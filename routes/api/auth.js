const express = require("express");

const ctrl = require ("../../controlers/auth")

const { validation, ctrlWrapper, auth } = require("../../middlewares/index")

const shemas  = require("../../models/user");

const router = express.Router();

router.post("/register", validation(shemas.schemas.joiRegisterSchema), ctrlWrapper(ctrl.register));
router.post("/login", validation(shemas.schemas.joiLoginSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, validation(shemas.schemas.joiLoginSchema), ctrlWrapper(ctrl.logout));

module.exports = router;