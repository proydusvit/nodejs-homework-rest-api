const fs = require("fs/promises")
const path = require("path")

const { User } = require("../../models");

const Jimp = require("jimp");


const avatarDir = path.join(
  __dirname,
  "../../",
  "public",
  "avatars"
);

const tempDir = path.join(__dirname, "../../", "tmp");

const updateAvatar = async (req, res) => {
  try {
    console.log(req.file);
    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;

    await Jimp.read(`${tempDir}/${originalname}`)
      .then((avatar) => {
        return avatar
          .resize(256, 256, Jimp.RESIZE_BICUBIC)
          .quality(60)
          .write(`${tempDir}/${originalname}`);
      })
      .catch((error) => {
        console.error(error);
      });

    const fileName = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarDir, fileName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", fileName);
    await User.findByIdAndUpdate(_id, {
      avatarURL,
    });

    res.status(200).json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;