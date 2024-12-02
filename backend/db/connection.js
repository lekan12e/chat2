import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connection established");
  } catch (error) {
    console.error("Error connecting to Mongodb");
  }
};

export default connect;
