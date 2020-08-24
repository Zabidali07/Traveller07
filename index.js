const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const articles = require("./server/routes/articles");
//const fileRoutes = require("./server/routes/image");
const app = express();

require("dotenv").config();
const { NODE_PORT, DATABASE_URL, NODE_ENV } = process.env;

const PORT = process.env.PORT || NODE_PORT || 8000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(express.static(path.join(__dirname, "/client/build"))); //neded to be changed

app.use("/uploads", express.static("./server/uploads"));

app.use(express.static("client/build"));

app.use("/blogs", articles);
//app.use("/blogs/files", fileRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

if (NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose
  .connect(DATABASE_URL, {
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
