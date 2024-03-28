import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
    maxLength: [30, "Name cannot exceed 30 chars"],
    minLength: [3, "Name should have more than 3 chars"]

  },
  email: {
    type: String,
    required: [true, "enter email"],
    unique: true,
    validate: [validator.isEmail, "please enter valid email"]
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    minLength: [8, "password should be greater than 8 chars"],
    select: false//find function wont return

  },
  avatar: {

    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true

    }

  },
  role: {
    type: String,
    default: "user"
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,

});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

//Token jwt
userSchema.methods.getJWTToken = function () {
  return jsonwebtoken.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

//generating password reset toen
userSchema.methods.getResetPasswordToken = function () {
  //generating token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hashing and add to userschema
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;