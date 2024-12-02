import User from "../models/user.mode.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/tokenGenerator.js";

const signup = async (req, res) => {
  try {
    const { username, fullname, password, confirmPassword, gender } = req.body;

    if (!username || !password || !confirmPassword || !gender || !fullname) {
      return res.status(403).send({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(403).send({ message: "Passwords do not match" });
    }

    if (gender !== "male" && gender !== "female") {
      return res.status(403).send({ message: "Gender must be male or female" });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(403).send({ message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const profilePicture =
      gender === "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${username}`
        : `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const user = new User({
      username,
      fullname,
      password: hashpassword,
      gender,
      profilePicture,
    });

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

    console.log({
      id: user._id,
      fullname: user.fullname,
      username: user.username,
      gender: user.gender,
    });

    res.status(201).send({
      message: "User created successfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        gender: user.gender,
        picture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An error occurred during signup" });
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

export { login, signup, logout };
