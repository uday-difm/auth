const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.route");
require("dotenv").config();
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
const crudRouter = require("./routes/taskCrud.route");
const port = process.env.PORT || 3000;
const { db } = require("./db/db");

app.use("/", crudRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
