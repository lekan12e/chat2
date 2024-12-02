import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .send({ message: "Unauthorised: invalid or no token provided" });
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    if (!decoded) {
      return res
        .status(401)
        .send({ message: "Unauthorised: invalid or no token provided" });
    }
    const user = decoded.user;
    req.user = user;
    next();
  } catch (error) {
    console.error(error, "error in validateToken");
    res.status(500).send({ error: "internal server error" });
  }
};

export default verifyToken;
