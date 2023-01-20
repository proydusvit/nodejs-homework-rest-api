const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { HttpError } = require("../../helpers")

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }
     if(!user.verify) {
        throw HttpError(401, "Email not verify")
    }
  const payload = {
    id: user._id,
  };
  const subscription = user.subscription;

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1d",
  });
  await User.findByIdAndUpdate(user._id, { token });
  
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = login;