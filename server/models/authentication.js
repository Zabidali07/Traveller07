const mongoose = require("mongoose");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    profileImg: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Images",
    },
    profileImgPath: {
      type: String,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    resetPasswordLink: {
      type: String,
    },
  },
  { timeStamp: true }
);

UserSchema.methods = {
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random() + "");
  },

  encryptPassword: function (password) {
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return err;
    }
  },

  authenticate: function (password) {
    return this.encryptPassword(password) === this.hashed_password;
  },
};
UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;

    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

var Users = mongoose.model("Users", UserSchema);
module.exports = Users;
