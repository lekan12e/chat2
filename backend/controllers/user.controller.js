import User from "../models/user.mode.js";

const searchUser = async (req, res) => {
  try {
    const { username } = req.query;
    if (!username)
      return res.status(400).send({ message: "query paramtter required" });

    const user = await User.findOne({ username: username });
    if (!user) return res.status(404).send({ message: "user not found" });
    res.status(200).send({ user });
  } catch (error) {
    console.log(error, "error in search user contoller");
    res.status(500).send({ message: "internal server error" });
  }
};

export { searchUser };
