const Article = require("../models/articles");
const Users = require("../models/authentication");

exports.getAllPosts = (req, res) => {
  Article.find({}).exec((err, posts) => {
    if (err)
      return res.status(400).json({
        error: `unable to get posts from database ${err}`,
      });

    return res.json({
      result: posts,
    });
  });
};

exports.getNameFromEmail = (req, res) => {
  const { email } = req.body;
  Users.findOne({ email }).exec((err, user) => {
    if (err || !user)
      return res.status(400).json({
        error: `unable to get posts from database ${err}`,
      });
    return res.json({
      result: user,
    });
  });
};

exports.eachUserPosts = (req, res) => {
  const { postedByEmail } = req.body;
  Article.find({ postedByEmail }).exec((err, posts) => {
    if (err)
      return res.status(400).json({
        error: `unable to get posts from database ${err}`,
      });

    return res.json({
      result: posts,
    });
  });
};

exports.UpdateFields = (req, res) => {
  const { id, newName, imgPath } = req.body;
  Users.findOneAndUpdate(
    { _id: id },
    { $set: { name: newName, profileImgPath: imgPath } }
  ).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: `unable to get posts from database ${err}`,
      });
    }
    return res.json({
      result: user,
    });
  });
};

exports.getOneArticle = (req, res) => {
  const { id } = req.body;

  Article.findById(id).exec((err, article) => {
    if (err) {
      return res.status(400).json({
        error: `error to fetch this post ${err}`,
      });
    }
    return res.json({
      result: article,
    });
  });
};
