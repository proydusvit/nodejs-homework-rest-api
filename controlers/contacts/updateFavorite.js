const { Contact } = require("../../models/contact")
const { HttpError } = require("../../helpers/index")

const updateFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateContact = await Contact.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updateContact) {
      throw HttpError(400, "missing fields favorite");
    }
    res.json(updateContact);
  } catch (error) {
    next(error);
  }
  }

  module.exports = updateFavorite