const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        const post = new Post({
            title, body,
        });

        const savePost = await post.save();

        res.json({
            post: savePost,
        });
    }
    catch {
        return res.status(400).json({
            error: "Error while creating post",
        });
    }
};

//need same more testing after completing like wala controller
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("likes").populate("comments").exec();
        res.json({
            posts,
        })
    }
    catch {
        return res.status(400).json({
            error: "Error while fetching post",
        });
    }
}