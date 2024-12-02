import e from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import AuthRouter from "./routes/auth.routes.js";
import MessageRouter from "./routes/messages.routes.js";
import UserRouter from "./routes/user.routes.js";
import connection from "./db/connection.js";

const app = e();
dotenv.config();
app.use(cookieParser());
app.use(e.json());

const port = process.env.PORT || 5001;

app.use("/api/auth", AuthRouter);
app.use("/api/message", MessageRouter);
app.use("/api/users", UserRouter);

app.listen(port, async () => {
  await connection();
  console.log("server listening on port " + port);
});
