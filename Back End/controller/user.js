import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import UserModel from "../Model/UserModel.js";
import ProfileModel from "../Model/ProfileModel.js";

//configuring dotenv files
dotenv.config();

//declaring variables from dotenv  to variable
const SECRETKEY = process.env.SECRETKEY;
// const PORT = process.env.SMTP_PORT;
const USER = process.env.USER;
const PASS = process.env.PASSWORD;

//User signin process
export const signin = async (req, res) => {
  const { email, password } = req.body; //Coming from formData

  try {
    const existingUser = await UserModel.findOne({ email: email });
    console.log(existingUser);
    //get userprofile and append to login auth detail
    const userProfile = await ProfileModel.findOne({
      userId: existingUser?._id,
    });

    if (!existingUser)
      return res.status(404).json({ message: "Invalid credentials" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    //If credentials are valid, create a token for the user
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRETKEY,
      { expiresIn: "1h" }
    );

    //Then send the token to the client/frontend
    res.status(200).json({ result: existingUser, userProfile, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//User Registeration process
export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, bio } =
    req.body;

  try {
    const existingUser = await UserModel.findOne({ email: email });
    const userProfile = await ProfileModel.findOne({
      userId: existingUser?._id,
    });

    if (existingUser)
      return res.status(400).json({ message: "User already exist" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      bio,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRETKEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ result, userProfile, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// export const updateProfile = async (req, res) => {
//     const formData = req.body
//     const { id: _id } = req.params
//     console.log(formData)

//     if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with this id found')

//     const updatedUser = await User.findByIdAndUpdate(_id, formData, {new: true})
//     res.json(updatedUser)
// }

//User Forget password process
export const forgotPassword = (req, res) => {
  const { email } = req.body;
  // console.log(email);
  // NODEMAILER TRANSPORT FOR SENDING POST NOTIFICATION VIA EMAIL
  const transporter = nodemailer.createTransport({
    service: "gmail",
    // port: PORT,
    auth: {
      user: USER,
      pass: PASS,
    }
  });

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    UserModel.findOne({ email }).then((user) => {
      // console.log(user);
      if (!user) {
        return res
          .status(422)
          .json({ error: "User does not exist in our database" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user
        .save()
        .then((result) => {
          transporter.sendMail({
            from: "Mk Billings <manivasagam55555@gmail.com>",
            to: user.email,
            subject: "Password reset request",
            html: `
                    <p style="font-size:14px;">You requested for password reset from Mk Billings Invoicing application</p>
                    <h3>Please click this <a href="http://localhost:5173/reset/${token}"><button style="background-color: #3498db; color: #fff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;font-weight:bold;">Reset Password</button></a> to reset your password</h3>
                    <p style="font-size:14px;">Is it not working? Don't Worry, just copy and paste the following url in your browser.</p>
                    <p style="font-size:14px;">http://localhost:5173/reset/${token}</p>
                    <p style="font-size:14px;">If this was a mistake, just ignore this email and nothing will happen.</p>
                    `,
          });
          res.json({
            message: `Mail sent successfully 👍, Kindly check your email 💌 `,
          });
        })
        .catch((err) => console.log(err));
    });
  });
};

//Reset Password Process
export const resetPassword = (req, res) => {
  console.log(req.body);
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  UserModel.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(422).json({ error: "Try again session expired" });
      }
      bcrypt.hash(newPassword, 12).then((hashedpassword) => {
        user.password = hashedpassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then((saveduser) => {
          res.json({ message: "password updated successfully" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
