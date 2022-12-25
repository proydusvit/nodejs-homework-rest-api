const {Schema, model} = require("mongoose");
const Joi = require("Joi");

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      favorite: {
        type: Boolean,
        default: false,
      },
}, {
  
 versionKey: false , timestamps: true
})

const addContactsSchema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(8).max(15).required(),
  favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = {
  addContactsSchema,
  updateFavoriteSchema,
};
const Contact = model("contact", contactSchema)

module.exports = {Contact, schemas};