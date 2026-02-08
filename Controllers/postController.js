const Post = require("../models/postModel");
const User=require('../models/userModel')

exports.createPost = async (req, res) => {
    console.log("inside create post");
    
  try {
    console.log(req.body);
    
    const { caption,image } = req.body;
    const userId = req.id;
    
    
    
    const imageUrl = req.file
        ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`:image;

    if (!caption || !imageUrl) {
      return res.status(401).json("cannot empty");
    }
    const newPost = new Post({
      user: userId,
      imageUrl,
      caption
    });
    await newPost.save();
    return res.status(201).json({ message: "posted successfully", newPost });
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username profile") 
      .sort({ createdAt: -1 }); 

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
};

exports.likeDislikePost = async (req, res) => {
  try {
    
    const userId = req.id;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json("Post not found");
    }

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      await post.save();
      return res.status(200).json({
        message: "Post disliked",
        likesCount: post.likes.length,
      });
    } else {
      post.likes.push(userId);
      await post.save();
      return res.status(200).json({
        message: "Post liked",
        likesCount: post.likes.length,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
