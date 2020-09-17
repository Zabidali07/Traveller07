const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const articles = require("./server/routes/articles");
//const fileRoutes = require("./server/routes/image");
const app = express();

require("dotenv").config();
const { NODE_PORT, DATABASE_URL, NODE_ENV, NEW_DATABASE_URL } = process.env;

const PORT = process.env.PORT || NODE_PORT || 8000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(express.static(path.join(__dirname, "/client/build"))); //neded to be changed

app.use("/uploads", express.static("./client/public/uploads"));

app.use(express.static("client/build"));

app.use("/blogs", articles);
//app.use("/blogs/files", fileRoutes);

if (NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

mongoose
  .connect(NEW_DATABASE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`DB Connected to port ${PORT} `);
    });
  })
  .catch((err) => console.log(`DB connection failed ${err}`));
