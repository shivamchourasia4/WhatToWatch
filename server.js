const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const users = require("./routes/users");
const auth = require("./routes/auth");
const watchlist = require("./routes/watchlist");
const connections = require("./routes/connections");
const suggestions = require("./routes/suggest");
const path = require("path");
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

app.use(express.json());

app.use("/wtw/", users);
app.use("/wtw/", auth);
app.use("/wtw/", watchlist);
app.use("/wtw/", connections);
app.use("/wtw/", suggestions);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`SERVER STARTED ON PORT ${port}`));
