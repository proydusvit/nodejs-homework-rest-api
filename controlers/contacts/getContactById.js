const { Contact } = require("../../models/contact")
const {HttpError} = require("../../helpers/index")

const getContactById = async (req, res, next) => {
    try {
    const { id } = req.params;
    const contactById = await Contact.findById(id);

    if (!contactById) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(contactById);
  } catch (error) {
    next(error);
  }
  }

  module.exports = getContactById;