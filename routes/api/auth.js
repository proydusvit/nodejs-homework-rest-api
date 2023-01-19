const express = require("express");

const ctrl = require ("../../controlers/auth")

const { validation, ctrlWrapper, auth } = require("../../middlewares/index")

const shemas  = require("../../models/user");

const router = express.Router();

router.post("/register", validation(shemas.schemas.joiRegisterSchema), ctrlWrapper(ctrl.register));
router.post("/login", validation(shemas.schemas.joiLoginSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, validation(shemas.schemas.joiLoginSchema), ctrlWrapper(ctrl.logout));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));
router.post("/verify",validation(shemas.schemas.JoiEmailSchema),ctrlWrapper(ctrl.resendVerifyEmail));


module.exports = router;