const {Contact} = require("../../models")

const addContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const newContacts = await Contact.create({
      ...req.body,
      owner: _id,
    });
    res.status(201).json(newContacts);
  } catch (error) {
    next(error);
  }
};

  module.exports = addContact;