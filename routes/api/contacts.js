const express = require('express');

const ctrl = require("../../controlers/contacts")

const {ctrlWrapper} = require("../../helpers/index")

const {validateBody, isValidId} = require("../../middlewares/index")

const {schemas} = require("../../models/contact")


const router = express.Router()


router.get("/", ctrlWrapper(ctrl.listContacts))

router.get("/:id", isValidId, ctrlWrapper(ctrl.getContactById))

router.post("/", validateBody(schemas.addContactsSchema), ctrlWrapper(ctrl.addContact))

router.put("/:id", isValidId, validateBody(schemas.addContactsSchema), ctrlWrapper(ctrl.updateContact))

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeContact));

router.patch("/:id/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite))



module.exports = router;