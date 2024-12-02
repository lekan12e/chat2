import jwt from "jsonwebtoken";

const generateToken = (user, res) => {
  const token = jwt.sign({ user }, process.env.ACCESS_TOKEN, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
};

export default generateToken;
