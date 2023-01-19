const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const emailRegexp =
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const subscriptionList = ["starter", "pro", "business"];

const userSchema = Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, "Email is required"],
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
     avatarURL: {
      type: String,
      requireda: true,
    },
       verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  required: [true, 'Verify token is required'],
  },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(
    password,
    bcrypt.genSaltSync(10)
  );
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiRegisterSchema = Joi.object({
  password: Joi.string().min(4).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().valid(...subscriptionList),
  token: Joi.string(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().min(4).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const JoiUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList),
});
 
const JoiEmailSchema =  Joi.object({
   email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  joiRegisterSchema,
  joiLoginSchema,
  JoiUpdateSubscriptionSchema,
  JoiEmailSchema
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};