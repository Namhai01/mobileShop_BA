const CommentModel = require("../models/Comment");

const postComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, body, full_name } = req.body;
    const postComment = await new CommentModel({
      email,
      prd_id: id,
      body,
      full_name,
    }).save();
    res.json({ postComment });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  postComment,
};
