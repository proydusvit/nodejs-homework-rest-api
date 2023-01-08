const express = require('express');

const ctrl = require("../../controlers/contacts")

const {validation, isValidId, ctrlWrapper, auth} = require("../../middlewares/index")

const {schemas} = require("../../models/contact")


const router = express.Router()


router.get("/", auth, ctrlWrapper(ctrl.listContacts))

router.get("/:id",auth, isValidId, ctrlWrapper(ctrl.getContactById))

router.post("/", auth, validation(schemas.addContactsSchema), ctrlWrapper(ctrl.addContact))

router.put("/:id",auth, isValidId, validation(schemas.addContactsSchema), ctrlWrapper(ctrl.updateContact))

router.delete("/:id",auth, isValidId, ctrlWrapper(ctrl.removeContact));

router.patch("/:id/favorite",auth, isValidId, validation(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite))



module.exports = router;