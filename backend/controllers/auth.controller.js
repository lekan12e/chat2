import User from "../models/user.mode.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/tokenGenerator.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

const signup = async (req, res) => {
  try {
    const { username, fullname, email, password, confirmPassword, gender } =
      req.body;

    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !gender ||
      !fullname
    ) {
      return res.status(403).send({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(403).send({ message: "Passwords do not match" });
    }

    if (gender !== "male" && gender !== "female") {
      return res.status(403).send({ message: "Gender must be male or female" });
    }

    const userExists = await User.findOne({ username });
    const emailExists = await User.findOne({ email });
    if (userExists || emailExists) {
      return res
        .status(403)
        .send({ message: "Username or email already exists" });
    }

    const verificationToken = jwt.sign(
      { username, fullname, email, password, gender },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );

    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
    await sendEmail(
      email,
      "Verify Your Email",
      `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`
    );

    res.status(200).send({
      message:
        "Verification email sent. Please check your inbox to verify your account.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An error occurred during signup" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res
        .status(400)
        .send({ message: "Verification token is required." });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    const { username, fullname, email, password, gender } = decoded;

    // Ensure the user hasn't already been verified
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.verified === false) {
        await User.findOneAndUpdate(
          { email: existingUser.email }, // Find user by email
          { $set: { verified: true } }, // Update `verified` field to true
          { new: true } // Return the updated document
        );
      }
      return res.status(400).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          margin-top: 50px;
          color: #333;
        }
        h1 {
          color: #4CAF50;
        }
      </style>
    </head>
    <body>
      <h1>Email Already Verified</h1>
      <p>You can now <a href="http://localhost:3000" style="color: #4CAF50; text-decoration: none;">log in</a>.</p>
    </body>
    </html>
  `);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const profilePicture =
      gender === "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${username}`
        : `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const user = new User({
      username,
      fullname,
      email,
      password: hashedPassword,
      gender,
      profilePicture,
      verified: true, // Mark user as verified
    });

    await user.save();

    res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          margin-top: 50px;
          color: #333;
        }
        h1 {
          color: #4CAF50;
        }
      </style>
    </head>
    <body>
      <h1>Email Verified Successfully!</h1>
      <p>You can now <a href="http://localhost:3000" style="color: #4CAF50; text-decoration: none;">log in</a>.</p>
    </body>
    </html>
  `);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Invalid or expired token." });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res
        .status(401)
        .send({ message: "user with username not found or does not exist" });
    }
    const Password = await bcrypt.compare(password, user.password);
    if (!Password) {
      return res.status(401).send({ message: "invalid password" });
    }
    if (user) {
      const { username, fullname, gender, profilePicture } = user;
      const newUser = {
        id: user._id,
        username,
        fullname,
        gender,
        profilePicture,
      };
      generateToken(newUser, res);
      await user.save();
    }
    res.status(200).send({
      message: "login successful",
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        gender: user.gender,
        picture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("failed to login error in login controller", error);
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).send({ message: "logged out successfully" });
  } catch (error) {
    console.error("error in the logout controller", error);
  }
};

export { login, signup, logout, verifyEmail };
