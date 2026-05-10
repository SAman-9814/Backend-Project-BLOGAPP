//import model
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

// Like a post

exports.likePost = async (req, res) => {
    try {
        //fetch data from req body
        const { post, user } = req.body;

        //create a comment object
        const like = new Like({
            post, user,
        });

        //save the new comment into the database
        const savedLike = await like.save();

        //find the post by ID, add the new comment in its comments array
        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { likes: savedLike._id } }, { returnDocument: 'after' })
            .populate("likes").exec();

        res.json({
            post: updatedPost,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: "Error While liking Post",
        })
    }
}

//Unlike a post
exports.unlikePost = async (req, res) => {
    try {
        const { post, like } = req.body;

        //find and delete the like collection meh se
        const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

        //update the post collection
        const updatedPost = await Post.findByIdAndUpdate(post, { $pull: { likes: deletedLike._id } }, { returnDocument: 'after' })

        res.json({
            post: updatedPost,
        });
    }
    catch (error) {
        return res.status(400).json({
            error: "Error while Unliking post",
        })
    }
}
