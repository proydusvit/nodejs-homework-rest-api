const express = require("express");

const ctrl = require ("../../controlers/users")

const { ctrlWrapper,auth, upload } = require("../../middlewares/index")


const shemas  = require("../../models/user");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar))

module.exports = router;