const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const {nanoid} = require("nanoid")

const { sendEmail } = require("../../helpers")

const { User } = require("../../models");

const register = async (req, res) => {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();

  const newUser = new User({ email, subscription, avatarURL, verificationCode });
  newUser.setPassword(password);
  newUser.save();

  const verifyEmail = {
    to: email, 
    subject: "Verify email",
      html: `<a target="_blank" href="http://localhost:3001/api/auth/verify/${verificationCode}">Click verify email</a>`
  }

  await sendEmail(verifyEmail);

  res.status(201).json({
    status: "Created",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL
      },
    },
  });
};

module.exports = register;