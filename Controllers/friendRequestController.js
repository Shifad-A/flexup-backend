const Friend = require("../models/friendRequestModel");
const User = require("../models/userModel");

exports.requestFriend = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    console.log(senderId);
    console.log(receiverId);

    const friends = await Friend.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    if (friends) {
      return res.status(401).json("alredy requested");
    }

    const request = new Friend({ sender: senderId, receiver: receiverId });
    await request.save();
    return res.status(200).json({ message: "Friend request send", request });
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getFriendRequests = async (req, res) => {
  try {
    const userId = req.id;

    const pendingRequests = await Friend.find({
      receiver: userId,
      status: "pending",
    })
      .populate("sender", "username email profile")
      .sort({ createdAt: -1 });

    return res.status(200).json(pendingRequests);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.acceptFriendRequests = async (req, res) => {
  try {
    const requestId = req.params.id;

    const request = await Friend.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request already handled" });
    }
    request.status = "accepted";
    await request.save();

    res.status(200).json({ message: "Friend request accepted" });
  } catch (err) {
    console.log(err);
  }
};

exports.rejectFriendRequests = async (req, res) => {
  try {
    const requestId = req.params.id;

    const request = await Friend.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    request.status = "rejected";
    await request.save();
    return res.status(200).json({ message: "request rejected" });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getFriends = async (req, res) => {
  const userId = req.id;

  try {
    const friends = await Friend.find({
      status: "accepted",
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender", "username email profile")
      .populate("receiver", "username email profile");

    // Extract the "other" user
    const friendList = friends.map((reqDoc) => {
      if (reqDoc.sender._id.toString() === userId) {
        return reqDoc.receiver;
      } else {
        return reqDoc.sender;
      }
    });

    return res
      .status(200)
      .json({ message: "fetched successfully", friendList });
  } catch (error) {
    res.status(500).json(error);
  }
};
